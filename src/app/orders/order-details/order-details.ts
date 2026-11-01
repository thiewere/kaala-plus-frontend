import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../order-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderViewResponse } from '../order.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HeaderData } from '../../header/header-data.model';
import { Header } from '../../header/header';
import { Card } from 'primeng/card';
import { PaymentService } from '../../payments/payment-service';


@Component({
  selector: 'app-order-details',
  imports: [DatePipe, RouterLink, Header, Card, DecimalPipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails {

  orderService = inject(OrderService);
  paymentService = inject(PaymentService);
  activatedRoute = inject(ActivatedRoute);
  
  orderReference = this.activatedRoute.snapshot.paramMap.get('reference');

  protected readonly headerData =  signal<HeaderData>({title: `Detail de la commande ${this.orderReference}`, icon: "shopping-cart"})


  orderDetails = toSignal<OrderViewResponse>(this.orderService.getOrderDetails(this.orderReference!));
  paymentSummary = toSignal(this.paymentService.getOrderPaymentSummary(this.orderReference!));
}
