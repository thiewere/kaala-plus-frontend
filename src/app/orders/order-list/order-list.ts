import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../order-service';
import { OrderSummary } from '../order.model';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

import { ButtonModule } from 'primeng/button';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { OrderItem } from "../order-item/order-item";
import { RechercheAdd } from "../../recherche-add/recherche-add";
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-list',
  imports: [TableModule, TagModule, AvatarModule, ButtonModule, Header, OrderItem, RechercheAdd],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  orderService = inject(OrderService);

  orders = toSignal<OrderSummary[]>(this.orderService.getOrderSummaries());

  protected readonly headerData = signal<HeaderData>({title: "Liste des commandes", icon: "shopping-cart"})
 
  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par le nom", label: "Nouvelle Commande", link: "create"})


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
