import { Component, inject, input } from '@angular/core';
import { OrderSummary } from '../order.model';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Eye } from '@primeicons/angular/eye';
import { Router } from '@angular/router';
import { getStatusLabel, getStatusSeverity } from '../order-status.utils';

@Component({
  selector: 'tr[app-order-item]',
  imports: [TagModule, ButtonModule, Eye],
  templateUrl: './order-item.html',
  styleUrl: './order-item.scss',
})
export class OrderItem {

    router = inject(Router);

  order = input.required<OrderSummary>();
  index = input.required<number>();

  protected readonly getStatusLabel = getStatusLabel;
  protected readonly getStatusSeverity = getStatusSeverity;
  
    viewOrderDetails(reference: string) {
        this.router.navigate(['/orders', reference, 'details']);
    }

}
