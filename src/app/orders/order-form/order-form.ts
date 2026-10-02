import { Component, computed, inject, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { LabelModule } from 'primeng/label';
import { ClientService } from '../../clients/client-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Client } from '../../clients/client-list/client.model';

import { TableModule } from "primeng/table";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Textarea } from "primeng/textarea";
import { ClientForm } from "../../clients/client-form/client-form";
import { OrderService } from '../order-service';
import { Product } from '../../products/product.model';
import { ProductService } from '../../products/product-service';
import { SupplierService } from '../../suppliers/supplier-service';
import { SelectModule } from 'primeng/select';
import { SupplierProduct } from '../../suppliers/supplier.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CreateCompleteOrderRequest, OrderProduct } from '../order.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-order-form',
  imports: [Header, AutoCompleteModule,
    CardModule, LabelModule, FormsModule, TableModule,
    ReactiveFormsModule, ButtonModule, DialogModule, Textarea, ClientForm, SelectModule,
    InputNumberModule, InputTextModule, ToastModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm {
  protected readonly headerData = signal<HeaderData>({title: "Ajouter une commande", icon: "plus"})

  clientService = inject(ClientService);
  orderService = inject(OrderService);
  productService = inject(ProductService);
  supplierService = inject(SupplierService);
  router = inject(Router);
  messageService = inject(MessageService);

  clients = toSignal(this.clientService.getClients());
  products = toSignal(this.productService.getProducts());
  supplierProducts = toSignal(this.supplierService.getSuppliers());
  
  
  currentStep = signal<1 | 2 | 3>(1);

  isSubmitting = signal(false);
  showDialog: boolean = false;

  searchValue = '';
  selectedClient: Client | undefined;

  filteredItems: Client[] = [];

  searchProductValue = '';
  selectedProduct = signal<Product | undefined>(undefined);
  filteredProducts: Product[] = [];

  orderForm = new FormGroup({
    clientId: new FormControl(0, {validators: [Validators.required], nonNullable: true}),
    currency: new FormControl('', {validators: [Validators.required]}),
    description: new FormControl('', {validators: [Validators.required]})
  });

  orderItems: OrderProduct[] = [];
  unitPrice: number | null = null;
  quantity: number = 1;
  selectedSupplierProduct: SupplierProduct | undefined;
  filteredSuppliers = computed(() => {
    const product = this.selectedProduct();
    const items = this.supplierProducts();

    return items?.filter((item) => item.product.id === product?.id)
  })

  search(event: AutoCompleteCompleteEvent) {
  const query = event.query.toLowerCase();
  this.filteredItems = query ? (this.clients() ?? []).filter((client) => 
    `${client.firstname} ${client.lastname}`
    .toLowerCase()
    .includes(query)
    ) : [];
  }

  selectClient(event: any) {
    this.selectedClient = event.value;
    this.orderForm.patchValue({
      clientId: this.selectedClient?.id
    });
  }

  changeClient() {
    this.selectedClient = undefined;
    this.searchValue = '';
  }

  submit() {
    this.orderForm.markAllAsTouched();
    if(this.orderForm.invalid) return

    const order = this.orderForm.getRawValue();
    this.isSubmitting.set(true);
    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.messageService.add({
          severity: "success",
          summary: "Commande créée avec succès",
          detail: `${response}`
        });
        console.log("Commande créée: ", response);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error("Erreur lors de la creation: ", err);
      }
    })
  }

  createAndComplete() {
    this.orderForm.markAllAsTouched();
    if(this.orderForm.invalid || !this.selectedClient) return

    this.currentStep.set(2);
  }

  searchProduct(event: AutoCompleteCompleteEvent){
    const query = event.query.toLowerCase();
    this.filteredProducts = query ? (this.products() ?? []).filter((product) => 
    `${product.name}`
    .toLowerCase()
    .includes(query)
    ) : [];
  }

  selectProduct(event: any) {
    this.selectedProduct.set(event.value);
  }

  changeProduct() {
    this.selectedProduct.set(undefined);
    this.searchProductValue = '';
  }

  backward() {
    this.currentStep() === 2 ? this.currentStep.set(1) : this.currentStep.set(2);
  }
  
  onClientCreated(client: Client) {
    this.selectedClient = client;
    this.showDialog = false;
    console.log(this.selectedClient)
  }

  addItem() {
    if (!this.selectedSupplierProduct || !this.unitPrice) return

    const item: OrderProduct = {
      supplierProduct: this.selectedSupplierProduct,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      totalPrice: this.unitPrice * this.quantity
    };

    this.orderItems.push(item);
      
    this.resetCurrentItem();
  }

  resetCurrentItem() {
    this.selectedProduct.set(undefined);
    this.selectedSupplierProduct = undefined;
    this.quantity = 1;
    this.unitPrice = null;
    this.searchProductValue = '';
  }

  continueToSummary() {
    if(this.orderItems.length === 0) return;

    this.currentStep.set(3);
  }

  get orderTotal(): number {
    return this.orderItems.reduce(
      (total, item) => total + item.totalPrice, 0
    );
  }

  submitOrder() {
    if (this.orderForm.invalid || this.orderItems.length === 0) return;

    const formValue = this.orderForm.getRawValue();

    const request: CreateCompleteOrderRequest = {
      clientId: formValue.clientId,
      currency: formValue.currency!,
      description: formValue.description!,
      items: this.orderItems.map(item => ({
        supplierProductId: item.supplierProduct.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    };

    this.isSubmitting.set(true);

    this.orderService.createCompleteOrder(request).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        console.log('Commande créée: ', response)
        this.router.navigate(['orders']);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        console.error('Erreur lors de la création :', error);
      }
    })
  }
}
