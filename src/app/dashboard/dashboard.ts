import { Component, inject, signal } from '@angular/core';
import { DashboardCard } from "./dashboard-card/dashboard-card";
import { DashboardCardData } from './dashboard-card/dashboard-card-data';
import { DASHBOARD_CARDS } from './data/dashboard-cards.data';
import { OrderService } from '../orders/order-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';
import { DashboardItem } from './dashboard-item/dashboard-item';

import { ListCheck } from '@primeicons/angular/list-check';


@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard, TableModule, DashboardItem, ListCheck],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  orderService = inject(OrderService);

  cards = signal<DashboardCardData[]>(DASHBOARD_CARDS)

  pendingOrders = toSignal(this.orderService.getPendingOrders())
}
