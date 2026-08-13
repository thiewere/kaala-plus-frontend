import { Component, signal } from '@angular/core';

import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';

@Component({
  selector: 'app-order-list',
  imports: [Header],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {

  protected readonly headerData = signal<HeaderData>({title: "Liste des commandes", icon: "shopping-cart"})

}
