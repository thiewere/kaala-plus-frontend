import { Component, inject, input } from '@angular/core';
import { PendingOrderResponse } from '../../orders/order.model';
import { ButtonModule } from 'primeng/button';

import { ArrowUpRight } from '@primeicons/angular/arrow-up-right';
import { Router } from '@angular/router';


@Component({
  selector: 'tr[app-dashboard-item]',
  imports: [ButtonModule, ArrowUpRight],
  templateUrl: './dashboard-item.html',
  styleUrl: './dashboard-item.scss',
})
export class DashboardItem {
  private router = inject(Router);
  value = input.required<PendingOrderResponse>();
  index = input.required<number>();
  
  completeOrder() {
    console.log(this.value().id)
    this.router.navigate(['/orders', this.value().id, 'complete'])
  }
}
