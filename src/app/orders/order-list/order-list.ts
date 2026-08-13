import { Component, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';

@Component({
  selector: 'app-order-list',
  imports: [ButtonModule, Header],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {

  protected readonly headerData = signal<HeaderData>({title: "Liste des commandes", icon: "shopping-cart"})

}
