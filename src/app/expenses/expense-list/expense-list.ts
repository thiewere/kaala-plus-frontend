import { Component, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from "../../header/header";
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { RechercheAdd } from "../../recherche-add/recherche-add";

@Component({
  selector: 'app-expense-list',
  imports: [Header, RechercheAdd],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList {
  protected readonly headerData = signal<HeaderData>({title: "Liste des Dépenses", icon: "wallet"})
  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par type", label: "Nouvelle Dépense"})
 
}
