import { Component, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { RechercheAdd } from "../../recherche-add/recherche-add";

@Component({
  selector: 'app-product-list',
  imports: [Header, RechercheAdd],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  protected readonly headerData = signal<HeaderData>({title: 'Liste des Produits', icon: 'box'});

 protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par le nom", label: "Nouveau Produit"})
}
