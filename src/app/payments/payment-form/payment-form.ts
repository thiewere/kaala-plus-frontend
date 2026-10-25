import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
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
    currencyId: new FormControl<number | null>(null, {validators: [Validators.required], nonNullable: true}),
    exchangeRate: new FormControl<number | null>(null, {validators: [Validators.required], nonNullable: true}),
    paymentDate: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    note: new FormControl('', {nonNullable: true})
  });

  protected readonly paymentValues = toSignal(this.paymentForm.valueChanges, 
    {initialValue: this.paymentForm.getRawValue()});
  
  protected readonly estimatedConvertedAmount = computed(() => {
    this.paymentValues();

    const {amount, exchangeRate} = this.paymentForm.getRawValue();

    if (amount === null || exchangeRate === null ||
      amount <= 0 || exchangeRate <= 0) {
        return 0;
    }

    return Math.round((amount * exchangeRate + Number.EPSILON) * 100) / 100;
  });

  protected readonly exceedsRemainingAmount = computed(() => {
    const summary = this.selectedOrder();

    if (!summary) return false;

    return this.estimatedConvertedAmount() > summary.remainingAmount;
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

      if (summary) {
        this.configurePaymentCurrency(summary);
      } else {
        this.paymentForm.controls.currencyId.reset();
        this.paymentForm.controls.exchangeRate.reset(null);
      }
    });

    this.paymentForm.controls.currencyId.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.updateExchangeRate();
    });
  }
  
  private configurePaymentCurrency(summary: OrderPaymentSummary): void {
    const currencyControl = this.paymentForm.controls.currencyId;

    const firstPayment = summary.payments[0];

    if (!firstPayment) {
      currencyControl.enable();
      currencyControl.setValue(null);
    }else {
      const currency = this.currencies.find(
        c => c.name === firstPayment.currency
      );
      currencyControl.setValue(currency?.id ?? null);
      currencyControl.disable();
    }

    this.updateExchangeRate();
  }

  private updateExchangeRate(): void {
    const summary = this.selectedOrder();

    if(!summary) return;

    const currencyId = this.paymentForm.controls.currencyId.value;
    const selectedCurrency = this.currencies.find(c => c.id === currencyId);

    const exchangeRateControl = this.paymentForm.controls.exchangeRate;

    if (selectedCurrency?.name === summary.currency) {
      exchangeRateControl.setValue(1);
      exchangeRateControl.disable();
    } else {
      exchangeRateControl.enable();
      exchangeRateControl.reset();
    }
  }
}
