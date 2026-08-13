import { Component, inject, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { RechercheAdd } from "../../recherche-add/recherche-add";
import { ProductService } from '../product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';
import { ProductItem } from "../product-item/product-item";

@Component({
  selector: 'app-product-list',
  imports: [Header, RechercheAdd, TableModule, ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  protected readonly headerData = signal<HeaderData>({title: 'Liste des Produits', icon: 'box'});

  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par le nom", label: "Nouveau Produit"})

  productService = inject(ProductService);

  products = toSignal(this.productService.getProducts());
}
