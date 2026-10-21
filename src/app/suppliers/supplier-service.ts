import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Supplier, SupplierProduct } from './supplier.model';

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
}
