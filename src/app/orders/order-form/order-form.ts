import { Component, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';


@Component({
  selector: 'app-order-form',
  imports: [Header],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm {
  protected readonly headerData = signal<HeaderData>({title: "Ajouter une commande", icon: "plus"})

}
