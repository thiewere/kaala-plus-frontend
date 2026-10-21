import { Component, input, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from '../../header/header';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Card } from 'primeng/card';
import { RadioButton } from 'primeng/radiobutton';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'app-product-form',
  imports: [Header, ReactiveFormsModule, NgTemplateOutlet, Card, RadioButton, InputText, TextareaModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Produit', icon: 'box'});

  dialogMode = input(false);

  form = new FormGroup({
    productMode: new FormControl<'new' | 'existing'>('new', {nonNullable: true}),
    productId: new FormControl<number | null>(null),
    name: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    brand: new FormControl(''),
    description: new FormControl(''),

    supplierMode: new FormControl<'none' | 'existing' | 'new'>('none', {nonNullable: true}),
    supplierId: new FormControl<number | null>(null),
    supplierName: new FormControl(''),
    supplierPhone: new FormControl(''),
    supplierAddress: new FormControl(''),

    unitPrice: new FormControl<number | null>(null),
    currency: new FormControl('USD')
  });
}
