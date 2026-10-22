import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Supplier, SupplierProduct } from './supplier.model';
import { CreateProductAndSupplierRequest, CreateProductWithSupplierRequest, CreateSupplierProductRequest, CreateSupplierProductResponse, CreateSupplierWithProductRequest } from '../products/product.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl;

  getSuppliers() {
    return this.httpClient.get<SupplierProduct[]>(`${this.baseUrl}supplier_products`);
  }

  getOnlySuppliers() {
    return this.httpClient.get<Supplier[]>(`${this.baseUrl}suppliers`);
  }

  createProductWithSupplier(request: CreateProductWithSupplierRequest) {
    return this.httpClient.post<CreateSupplierProductResponse>(`${this.baseUrl}supplier_products/new-product`, request)
  }

  createProductAndSupplier(request: CreateProductAndSupplierRequest) {
    return this.httpClient.post<CreateSupplierProductResponse>(`${this.baseUrl}supplier_products/new-supp-product`, request)

  }

  createSupplierWithProduct(request: CreateSupplierWithProductRequest) {
    return this.httpClient.post<CreateSupplierProductResponse>(`${this.baseUrl}supplier_products/new-supplier`, request)
    
  }

  createSupplierProduct(request: CreateSupplierProductRequest) {
    return this.httpClient.post<CreateSupplierProductResponse>(`${this.baseUrl}supplier_products`, request)

  }
}
