import { Component, inject, input, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from '../../header/header';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Card } from 'primeng/card';
import { RadioButton } from 'primeng/radiobutton';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProductService } from '../product-service';
import { Product } from '../product.model';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';


@Component({
  selector: 'app-product-form',
  imports: [Header, ReactiveFormsModule, NgTemplateOutlet, Card, RadioButton, 
    InputText, TextareaModule, AutoCompleteModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  productService = inject(ProductService);

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Produit', icon: 'box'});

  dialogMode = input(false);

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  modeSuppliers = [
    { value: 'existing', label: 'Fournisseur existant '},
    { value: 'new', label: 'Nouveau Fournisseur'}
  ]

  form = new FormGroup({
    productMode: new FormControl<'new' | 'existing'>('new', {nonNullable: true}),
    productId: new FormControl<number | null>(null),
    name: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    brand: new FormControl(''),
    description: new FormControl(''),

    supplierMode: new FormControl<'existing' | 'new'>('existing', {nonNullable: true}),
    supplierId: new FormControl<number | null>(null),
    supplierName: new FormControl(''),
    supplierPhone: new FormControl(''),
    supplierAddress: new FormControl(''),

    unitPrice: new FormControl<number | null>(null),
    currency: new FormControl('USD'),

    selectedProduct: new FormControl<Product | null>(null)
  });

  constructor() {
    this.productService.getProducts().subscribe({
      next: products => this.products.set(products)
    });
  }

  searchProduct(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase().trim();

    this.filteredProducts.set(
      this.products().filter(product => product.name.toLowerCase().includes(query))
    )
  }

  onProductSelect(event: AutoCompleteSelectEvent) {
    const product: Product = event.value;
    this.form.controls.productId.setValue(product.id);
  }

  onProductFieldClear() {
    this.form.controls.productId.setValue(null);
  }
}
