import { Component, input, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from '../../header/header';

@Component({
  selector: 'app-product-form',
  imports: [Header],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Produit', icon: 'box'});

  dialogMode = input(false);


}
