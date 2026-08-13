import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClien = inject(HttpClient);

  baseUrl = environment.apiUrl + 'products'

  getProducts(){
    return this.httpClien.get<Product[]>(this.baseUrl);
  }
}
