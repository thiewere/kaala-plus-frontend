import { NgTemplateOutlet } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Header } from '../../header/header';
import { HeaderData } from '../../header/header-data.model';

@Component({
  selector: 'app-payment-form',
  imports: [NgTemplateOutlet, CardModule, Header],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {

  dialogMode = input(false);

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Paiement', icon: 'money-bill'});
}
