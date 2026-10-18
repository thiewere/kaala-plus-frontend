import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateCompleteOrderRequest, CreateOrderResponse, CreateOrderRequest, OrderProduct, PendingOrderResponse, OrderDetailsResponse } from './order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl;

  getOrderProducts() {
    return this.httpClient.get<OrderProduct[]>(`${this.baseUrl}order_items`)
  }

  // TODO: implement the logic to get all informations needed (Montant payé, Reste à payer, Paiement)

  createOrder(request: CreateOrderRequest) {
    return this.httpClient.post<CreateOrderResponse>(`${this.baseUrl}orders`, request);
  }

  createCompleteOrder(request: CreateCompleteOrderRequest) {
    return this.httpClient.post<CreateOrderResponse>(`${this.baseUrl}orders/complete`, request);
  }

  getPendingOrders() {
    return this.httpClient.get<PendingOrderResponse[]>(`${this.baseUrl}orders?state=INITIATED`);
  }

  getOrderById(id: number) {
    return this.httpClient.get<OrderDetailsResponse>(`${this.baseUrl}orders/${id}`);
  }
}
