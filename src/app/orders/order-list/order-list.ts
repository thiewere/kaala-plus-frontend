import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../order-service';
import { OrderProduct } from '../order.model';

import { ButtonModule } from 'primeng/button';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';

@Component({
  selector: 'app-order-list',
  imports: [ButtonModule, Header],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  orderService = inject(OrderService);

  orders = signal<OrderProduct[]>([]);

  protected readonly headerData = signal<HeaderData>({title: "Liste des commandes", icon: "shopping-cart"})

  constructor() {
    this.orderService.getOrderProducts().subscribe((data) => {
      this.orders.set(data)
    })
  }
  
}
