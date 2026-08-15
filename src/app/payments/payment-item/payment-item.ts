import { Component, input } from '@angular/core';
import { Payment } from '../payment.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'tr[app-payment-item]',
  imports: [CurrencyPipe],
  templateUrl: './payment-item.html',
  styleUrl: './payment-item.scss',
})
export class PaymentItem {
  value = input.required<Payment>();
  index = input.required<number>();
}
