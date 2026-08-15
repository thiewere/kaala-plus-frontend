import { Component, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from "../../header/header";

@Component({
  selector: 'app-expense-list',
  imports: [Header],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList {
  protected readonly headerData = signal<HeaderData>({title: "Liste des Dépenses", icon: "wallet"})
 
}
