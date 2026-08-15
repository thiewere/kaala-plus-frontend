import { Component, input } from '@angular/core';
import { SupplierProduct } from '../supplier.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'tr[app-supplier-item]',
  imports: [CurrencyPipe],
  templateUrl: './supplier-item.html',
  styleUrl: './supplier-item.scss',
})
export class SupplierItem {
  value = input.required<SupplierProduct>();

  index = input.required<number>();
}
