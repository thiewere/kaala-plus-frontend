import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SupplierProduct } from './supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl + 'supplier_products';

  getSuppliers() {
    return this.httpClient.get<SupplierProduct[]>(this.baseUrl);
  }
}
