import { Component, inject, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { RechercheAdd } from '../../recherche-add/recherche-add';
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { ClientService } from '../client-service';
import { Client } from './client.model';
import { TableModule } from 'primeng/table';
import { ClientItem } from "../client-item/client-item";

@Component({
  selector: 'app-client-list',
  imports: [Header, RechercheAdd, TableModule, ClientItem],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList {

  protected readonly headerData = signal<HeaderData>({title: 'Liste des Clients', icon: 'users'});

  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par le nom", label: "Nouveau Client"})

  clientService = inject(ClientService);

  clients = signal<Client[]>([]);

  constructor() {
    this.clientService.getClients().subscribe((client) => this.clients.set(client));
    console.log(this.clients())
  }
}
