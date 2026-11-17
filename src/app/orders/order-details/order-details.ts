import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../order-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderViewResponse } from '../order.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HeaderData } from '../../header/header-data.model';
import { Header } from '../../header/header';
import { Card } from 'primeng/card';
import { ArrowLeft } from '@primeicons/angular/arrow-left';
import { PaymentService } from '../../payments/payment-service';
import { ButtonModule } from 'primeng/button';
import { CheckCircle } from '@primeicons/angular/check-circle';
import { Plus } from '@primeicons/angular/plus';
import { startWith, Subject, switchMap } from 'rxjs';
import { getStatusLabel, getStatusSeverity } from '../order-status.utils';
import { TagModule } from 'primeng/tag';
import { CreditCard } from '@primeicons/angular/credit-card';
import { DialogModule } from 'primeng/dialog';
import { PaymentForm } from '../../payments/payment-form/payment-form';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, RouterLink, Header, Card, DecimalPipe, ButtonModule, CheckCircle, ArrowLeft, Plus, TagModule, CreditCard, DialogModule, PaymentForm],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails {

  orderService = inject(OrderService);
  paymentService = inject(PaymentService);
  activatedRoute = inject(ActivatedRoute);
  
  orderReference = this.activatedRoute.snapshot.paramMap.get('reference');

  protected readonly headerData =  signal<HeaderData>({title: `Detail de la commande ${this.orderReference}`, icon: "shopping-cart"})


  private refreshOrder$ = new Subject<void>();
  orderDetails = toSignal<OrderViewResponse>(
    this.refreshOrder$.pipe(
      startWith(undefined),
      switchMap(() =>
        this.orderService.getOrderDetails(this.orderReference!)
    ))
  );
  
  paymentSummary = toSignal(
    this.refreshOrder$.pipe(
      startWith(undefined),
      switchMap(() =>
        this.paymentService.getOrderPaymentSummary(this.orderReference!)
    ))
  );

  protected readonly getStatusLabel = getStatusLabel;
  protected readonly getStatusSeverity = getStatusSeverity;

  showPaymentDialog: boolean = false;

  submit() {
    this.orderService.confirmOrder(this.orderReference!).subscribe({
      next: () => {
        console.log('Order confirmed successfully');
        this.refreshOrder$.next(); // Trigger a refresh of the order details
      },
      error: (error) => { 
        console.error('Error confirming order:', error);
      }
    });
  }
}
