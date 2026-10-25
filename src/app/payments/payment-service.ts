import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CreatePaymentRequest, OrderPaymentSummary, Payment } from './payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.baseUrl}payments`);
  }

  getOrderPaymentSummary(orderReference: string): Observable<OrderPaymentSummary> {
    return this.httpClient.get<OrderPaymentSummary>(`${this.baseUrl}payments/orders/${encodeURIComponent(orderReference)}/summary`);
  }

  createPayment(request: CreatePaymentRequest): Observable<Payment> {
    return this.httpClient.post<Payment>(`${this.baseUrl}payments`, request);
  }
}