import { Component, input } from '@angular/core';
import { PendingOrderResponse } from '../../orders/order.model';
import { ButtonModule } from 'primeng/button';

import { ArrowUpRight } from '@primeicons/angular/arrow-up-right';


@Component({
  selector: 'tr[app-dashboard-item]',
  imports: [ButtonModule, ArrowUpRight],
  templateUrl: './dashboard-item.html',
  styleUrl: './dashboard-item.scss',
})
export class DashboardItem {
  value = input.required<PendingOrderResponse>();
  index = input.required<number>();
  
}
