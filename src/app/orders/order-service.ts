import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderProduct } from './order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl + 'order_items';

  getOrderProducts() {
    return this.httpClient.get<OrderProduct[]>(this.baseUrl)
  }

  // TODO: implement the logic to get all informations needed (Montant payé, Reste à payer, Paiement)


}
