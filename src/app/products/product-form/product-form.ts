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
import { SupplierService } from '../../suppliers/supplier-service';
import { Supplier } from '../../suppliers/supplier.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';


@Component({
  selector: 'app-product-form',
  imports: [Header, ReactiveFormsModule, NgTemplateOutlet, Card, RadioButton,
    InputText, TextareaModule, AutoCompleteModule, InputNumberModule, Select],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  productService = inject(ProductService);
  supplierService = inject(SupplierService);

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Produit', icon: 'box'});

  dialogMode = input(false);

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  modeSuppliers = [
    { value: 'existing', label: 'Fournisseur existant '},
    { value: 'new', label: 'Nouveau Fournisseur'}
  ]
  suppliers = signal<Supplier[]>([]);
  filteredSuppliers = signal<Supplier[]>([]);

  currencies = ['USD', 'RMB', 'GNF'];

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

    unitPrice: new FormControl<number>(0, {validators: [Validators.required, Validators.min(0.01)], nonNullable: true}),
    currency: new FormControl('USD'),

    selectedProduct: new FormControl<Product | null>(null),
    selectedSupplier: new FormControl<Supplier | null>(null)
  });

  constructor() {
    this.productService.getProducts().subscribe({
      next: products => this.products.set(products)
    });

    this.supplierService.getOnlySuppliers().subscribe({
      next: suppliers => this.suppliers.set(suppliers)
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

  searchSupplier(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase().trim();

    this.filteredSuppliers.set(
      this.suppliers().filter(supplier => supplier.name.toLowerCase().includes(query))
    );
  }

  onSupplierSelect(event: AutoCompleteSelectEvent) {
    const supplier: Supplier = event.value;
    this.form.controls.supplierId.setValue(supplier.id);
  }

   onSupplierFieldClear() {
    this.form.controls.supplierId.setValue(null);
  }
}
