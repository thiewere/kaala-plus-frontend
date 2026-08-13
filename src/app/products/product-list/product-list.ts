import { Component, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';

@Component({
  selector: 'app-product-list',
  imports: [Header],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  protected readonly headerData = signal<HeaderData>({title: 'Liste des Produits', icon: 'box'});

}
