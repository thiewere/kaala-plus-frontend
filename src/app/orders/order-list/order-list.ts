import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../order-service';
import { OrderProduct } from '../order.model';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

import { ButtonModule } from 'primeng/button';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { OrderItem } from "../order-item/order-item";

@Component({
  selector: 'app-order-list',
  imports: [TableModule, TagModule, AvatarModule, ButtonModule, Header, OrderItem],
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

   getSeverity(status: string) {
        switch (status) {
            case 'qualified':
                return 'success';
            case 'unqualified':
                return 'danger';
            case 'negotiation':
                return 'warn';
            case 'new':
                return 'info';
            case 'renewal':
                return 'secondary';
            case 'proposal':
                return 'info';
            default:
                return 'secondary';
        }
    }
}
