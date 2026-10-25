import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Header } from '../../header/header';
import { HeaderData } from '../../header/header-data.model';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../orders/order-service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PaymentService } from '../payment-service';
import { OrderPaymentSummary } from '../payment.model';
import { catchError, of, switchMap } from 'rxjs';
import { Currency } from '../../orders/order.model';

@Component({
  selector: 'app-payment-form',
  imports: [NgTemplateOutlet, CardModule, Header, SelectModule, InputTextModule, 
    TextareaModule, ButtonModule, InputNumberModule, DatePickerModule, 
    InputMaskModule, DecimalPipe, ReactiveFormsModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {

  orderServer = inject(OrderService);
  paymentService = inject(PaymentService);

  dialogMode = input(false);

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Paiement', icon: 'money-bill'});

  availableOrders = toSignal(this.orderServer.getOrdersForPayment());

  selectedOrder = signal<OrderPaymentSummary | null>(null);

  currencies: Currency[] = [
    { id: 1, name: 'RMB' },
    { id: 2, name: 'GNF' },
    { id: 3, name: 'USD' }
  ];

  isOrderSelected = signal(true);

  paymentForm = new FormGroup({
    orderReference: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    amount: new FormControl(0, {validators: [Validators.required], nonNullable: true}),
    currencyId: new FormControl(0, {validators: [Validators.required], nonNullable: true}),
    exchangeRate: new FormControl(1, {validators: [Validators.required], nonNullable: true}),
    paymentDate: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    note: new FormControl('', {nonNullable: true})
  });

  constructor() {
     this.paymentForm.controls.orderReference.valueChanges
    .pipe(
      switchMap(reference => {
        console.log('Commande sélectionnée :', reference);
        this.selectedOrder.set(null);

        if (!reference) {
          return of(null);
        }

        return this.paymentService.getOrderPaymentSummary(reference)
          .pipe(
            catchError(error => {
              console.error('Erreur de chargement du résumé', error);
              return of(null);
            })
          );
      }),
      takeUntilDestroyed()
    )
    .subscribe(summary => {
      this.selectedOrder.set(summary);
    });
  } 
}
