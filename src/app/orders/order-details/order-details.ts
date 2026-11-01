import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderData } from '../../header/header-data.model';
import { Header } from '../../header/header';


@Component({
  selector: 'app-order-details',
  imports: [ Header ],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails {

  activatedRoute = inject(ActivatedRoute);
  
  orderReference = this.activatedRoute.snapshot.paramMap.get('reference');

  protected readonly headerData =  signal<HeaderData>({title: `Detail de la commande ${this.orderReference}`, icon: "shopping-cart"})

}
