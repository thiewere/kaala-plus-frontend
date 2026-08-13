import { Component, input } from '@angular/core';
import { Client } from '../client-list/client.model';

@Component({
  selector: 'tr[app-client-item]',
  imports: [],
  templateUrl: './client-item.html',
  styleUrl: './client-item.scss',
})
export class ClientItem {

  value = input.required<Client>();
  index = input.required<number>();
}
