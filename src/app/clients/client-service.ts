import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from './client-list/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  httpClient = inject(HttpClient);

  baseUrl = "http://localhost:8080/api";

  getClients() {
    return this.httpClient.get<Client[]>(`${"http://localhost:8080/api"}/clients`);
  }
}
