import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from './client-list/client.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl + 'clients'

  getClients() {
    return this.httpClient.get<Client[]>(this.baseUrl);
  }

  createClient(client: {firstname: string, lastname: string, phone: string, country: string}) {
    return this.httpClient.post<Client>(this.baseUrl, client);
  }
}
