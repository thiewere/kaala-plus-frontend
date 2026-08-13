import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderProduct } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient = inject(HttpClient);

  baseUrl = "http://localhost:8080/api"

  getOrderProducts() {
    return this.httpClient.get<OrderProduct[]>(`${this.baseUrl}/order_items`)
  }
}
