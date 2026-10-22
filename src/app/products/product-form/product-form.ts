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
import { CreateProductAndSupplierRequest, CreateProductWithSupplierRequest, CreateSupplierProductRequest, CreateSupplierProductResponse, CreateSupplierWithProductRequest, Product } from '../product.model';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { SupplierService } from '../../suppliers/supplier-service';
import { Supplier } from '../../suppliers/supplier.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDirective } from 'primeng/button';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-product-form',
  imports: [Header, ReactiveFormsModule, NgTemplateOutlet, Card, RadioButton,
    InputText, TextareaModule, AutoCompleteModule, InputNumberModule, Select, ButtonDirective],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  productService = inject(ProductService);
  supplierService = inject(SupplierService);
  messageService = inject(MessageService);

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Produit', icon: 'box'});

  dialogMode = input(false);
  isSubmitting = signal(false);

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
    supplierName: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    supplierPhone: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    supplierAddress: new FormControl(''),

    unitPrice: new FormControl<number>(0, {validators: [Validators.required, Validators.min(0.01)], nonNullable: true}),
    currency: new FormControl('USD', {validators: [Validators.required], nonNullable: true}),

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

    this.form.controls.productMode.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(
      () => this.onProductModeChange());

    this.form.controls.supplierMode.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(
      () => this.onSupplierModeChange());
    
    this.updateValidators();
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

  private updateValidators(): void {
    const controls = this.form.controls;

    const isNewProduct = controls.productMode.value === "new";
    const isNewSupplier = controls.supplierMode.value === "new";

    controls.name.setValidators(
      isNewProduct ? [Validators.required] : []
    );

    controls.selectedProduct.setValidators(
      isNewProduct ? [] : [Validators.required]
    );

    controls.supplierName.setValidators(
      isNewSupplier ? [Validators.required] : []
    );

    controls.supplierPhone.setValidators(
      isNewSupplier ? [Validators.required] : []
    );

    controls.selectedSupplier.setValidators(
      isNewSupplier ? [] : [Validators.required]
    );

    [
      controls.name,
      controls.selectedProduct,
      controls.supplierName,
      controls.supplierPhone,
      controls.selectedSupplier
    ].forEach(control =>
      control.updateValueAndValidity({ emitEvent: false })
    );

  }

  private onProductModeChange():void {
    const controls = this.form.controls;

    if(controls.productMode.value === 'new') {
      controls.productId.setValue(null);
      controls.selectedProduct.setValue(null);
    } else {
      controls.name.reset();
      controls.brand.reset();
      controls.description.reset();
    }

    this.updateValidators();
  }

  private onSupplierModeChange():void {
    const controls = this.form.controls;

    if(controls.supplierMode.value === 'new') {
      controls.supplierId.setValue(null);
      controls.selectedSupplier.setValue(null);
    } else {
      controls.supplierName.reset();
      controls.supplierPhone.reset();
      controls.supplierAddress.reset();
    }

    this.updateValidators();
  }

  onSubmit(): void {
    this.updateValidators();

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const {
      productMode,
      supplierMode,
      productId,
      supplierId,
      name,
      brand,
      description,
      supplierName,
      supplierPhone,
      supplierAddress,
      unitPrice,
      currency
    } = this.form.getRawValue();

    let supplierProductRequest: Observable<CreateSupplierProductResponse>;

    if (productMode === 'new' && supplierMode === 'new') {
      const request: CreateProductAndSupplierRequest = {name, brand, description, supplierName, 
        supplierPhone, supplierAddress, unitPrice, currency};
      supplierProductRequest = this.supplierService.createProductAndSupplier(request);
    }else if (productMode === 'new' && supplierMode === 'existing') {
      if(supplierId === null) {
        this.form.controls.selectedSupplier.markAllAsTouched();
        return;
      };
      const request: CreateProductWithSupplierRequest = {name, brand, description, supplierId, 
       unitPrice, currency};
      supplierProductRequest = this.supplierService.createProductWithSupplier(request);
    }else if (productMode === 'existing' && supplierMode === 'new') {
      if(productId === null) {
        this.form.controls.selectedProduct.markAllAsTouched();
        return;
      }
      const request: CreateSupplierWithProductRequest = {productId, supplierName, supplierPhone, supplierAddress, 
       unitPrice, currency};
      
      supplierProductRequest = this.supplierService.createSupplierWithProduct(request);
    }else {
      if(productId === null || supplierId === null) {
        if (productId === null) {
          this.form.controls.selectedProduct.markAsTouched();
        }

        if (supplierId === null) {
          this.form.controls.selectedSupplier.markAsTouched();
        }
        return;
      }
      const request: CreateSupplierProductRequest = {productId, supplierId, unitPrice, currency};
      supplierProductRequest = this.supplierService.createSupplierProduct(request);
    }
  
    this.isSubmitting.set(true);
    supplierProductRequest.subscribe({
      next: () => {
        this.form.reset();
        this.messageService.add({
          severity:'success', 
          summary: 'Succès', 
          detail: 'Produit fournisseur créé avec succès'});
        this.isSubmitting.set(false);
      },
      error: (error) => {
        this.messageService.add({
          severity:'error', 
          summary: 'Erreur', 
          detail: error.error?.message || 'Une erreur s\'est produite lors de la création du produit fournisseur'
        });
        this.isSubmitting.set(false);
      }
    });

  }
}
