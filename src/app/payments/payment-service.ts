import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.baseUrl}payments`);
  }
}
