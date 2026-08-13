import { Component, input } from '@angular/core';
import { OrderProduct } from '../order.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'tr[app-order-item]',
  imports: [CurrencyPipe],
  templateUrl: './order-item.html',
  styleUrl: './order-item.scss',
})
export class OrderItem {

  order = input.required<OrderProduct>();
}
