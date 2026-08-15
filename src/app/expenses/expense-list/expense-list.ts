import { Component, inject, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from "../../header/header";
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { RechercheAdd } from "../../recherche-add/recherche-add";
import { ExpenseService } from '../expense-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-expense-list',
  imports: [Header, RechercheAdd, TableModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList {
  protected readonly headerData = signal<HeaderData>({title: "Liste des Dépenses", icon: "wallet"});
  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par type", label: "Nouvelle Dépense"});

  expenseService = inject(ExpenseService);
  expenses = toSignal(this.expenseService.getExpenses());
 
}
