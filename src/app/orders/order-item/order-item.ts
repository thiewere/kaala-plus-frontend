import { Component, input } from '@angular/core';
import { OrderSummary } from '../order.model';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Eye } from '@primeicons/angular/eye';

@Component({
  selector: 'tr[app-order-item]',
  imports: [TagModule, ButtonModule, Eye],
  templateUrl: './order-item.html',
  styleUrl: './order-item.scss',
})
export class OrderItem {

  order = input.required<OrderSummary>();
  index = input.required<number>();

  getStatusLabel(status: string) {
        switch (status) {
            case 'INITIATED':
                return 'À compléter';
            case 'READY_FOR_CONFIRMATION':
                return 'À confirmer';
            case 'CONFIRMED':
                return 'Confirmée';
            case 'IN_PROGRESS':
                return 'En cours';
            case 'PAID':
                return 'Payée';
            case 'COMPLETED':
                return 'Clôturée';
            case 'CANCELED':
                return 'Annulée';
            default:
                return 'Inconnue';
        }
  }

  getStatusSeverity(status: string) {
    switch (status) {
        case 'INITIATED':
            return 'secondary' as const;
        case 'READY_FOR_CONFIRMATION':
            return 'warn' as const;
        case 'CONFIRMED':
            return 'info' as const;
        case 'IN_PROGRESS':
            return 'info' as const;
        case 'PAID':
        case 'COMPLETED':
            return 'success' as const;
        case 'CANCELED':
            return 'danger' as const;
        default:
            return 'secondary' as const;
    }
}
  
}
