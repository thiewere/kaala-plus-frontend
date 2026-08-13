import { Component, input } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'tr[app-product-item]',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {

  value = input.required<Product>();
  index = input.required<number>();
}
