import { Component, inject, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { LabelModule } from 'primeng/label';
import { ClientService } from '../../clients/client-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Client } from '../../clients/client-list/client.model';

import { TableModule } from "primeng/table";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Textarea } from "primeng/textarea";
import { ClientForm } from "../../clients/client-form/client-form";

@Component({
  selector: 'app-order-form',
  imports: [Header, AutoCompleteModule,
    CardModule, LabelModule, FormsModule, TableModule,
    ReactiveFormsModule, ButtonModule, DialogModule, Textarea, ClientForm],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm {
  protected readonly headerData = signal<HeaderData>({title: "Ajouter une commande", icon: "plus"})

  clientService = inject(ClientService);

  clients = toSignal(this.clientService.getClients());
  
  showDialog: boolean = false;

  searchValue = '';
  selectedClient: Client | undefined;

  filteredItems: Client[] = [];

  orderForm = new FormGroup({
    clientId: new FormControl(0, {validators: [Validators.required], nonNullable: true}),
    description: new FormControl('', {validators: [Validators.required]})
  });

  search(event: AutoCompleteCompleteEvent) {
  const query = event.query.toLowerCase();
  this.filteredItems = query ? (this.clients() ?? []).filter((client) => 
    `${client.firstname} ${client.lastname}`
    .toLowerCase()
    .includes(query)
    ) : [];
  }

  selectClient(event: any) {
    this.selectedClient = event.value;
    this.orderForm.patchValue({
      clientId: this.selectedClient?.id
    });
  }

  changeClient() {
    this.selectedClient = undefined;
    this.searchValue = '';
  }

  submit() {
    if(this.orderForm.invalid) return

    console.log(this.orderForm.value)
  }
  
  onClientCreated(client: Client) {
    this.selectedClient = client;
    this.showDialog = false;
    console.log(this.selectedClient)
  }
}
