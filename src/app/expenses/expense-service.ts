import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Payment } from '../payments/payment.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  httpCient = inject(HttpClient);
  
  baseUrl = environment.apiUrl + 'expenses';

  getExpenses() {
    return this.httpCient.get<Payment[]>(this.baseUrl);
  }
}
