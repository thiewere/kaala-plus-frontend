import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SupplierProduct } from '../suppliers/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl + 'payments';

  getPayments() {
    return this.httpClient.get<SupplierProduct[]>(this.baseUrl);
  }
}
