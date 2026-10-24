import { NgTemplateOutlet } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Header } from '../../header/header';
import { HeaderData } from '../../header/header-data.model';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-payment-form',
  imports: [NgTemplateOutlet, CardModule, Header, SelectModule, InputTextModule, TextareaModule, ButtonModule, InputNumberModule, DatePickerModule, InputMaskModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {

  dialogMode = input(false);

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Paiement', icon: 'money-bill'});
}
