import { Component, input } from '@angular/core';
import { Expense } from '../expense.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'tr[app-expense-item]',
  imports: [CurrencyPipe],
  templateUrl: './expense-item.html',
  styleUrl: './expense-item.scss',
})
export class ExpenseItem {
  value = input.required<Expense>();
  index = input.required<number>();
}
