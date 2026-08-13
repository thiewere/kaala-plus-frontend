import { Component, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';

@Component({
  selector: 'app-client-list',
  imports: [Header],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList {

  protected readonly headerData = signal<HeaderData>({title: 'Liste des Clients', icon: 'users'});
}
