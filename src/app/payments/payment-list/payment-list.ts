import { Component, inject, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from "../../header/header";
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { RechercheAdd } from "../../recherche-add/recherche-add";
import { TableModule } from 'primeng/table';
import { PaymentService } from '../payment-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaymentItem } from "../payment-item/payment-item";

@Component({
  selector: 'app-payment-list',
  imports: [Header, RechercheAdd, TableModule, PaymentItem],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.scss',
})
export class PaymentList {
  protected readonly headerData = signal<HeaderData>({title: "Liste des Paiements", icon: "credit-card"})
  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par type de paiement", label: "Nouveau Paiement"})

  paymentService = inject(PaymentService);
  
  payments = toSignal(this.paymentService.getPayments());
}
