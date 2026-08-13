import { Component, signal } from '@angular/core';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { RechercheAdd } from '../../recherche-add/recherche-add';
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';

@Component({
  selector: 'app-client-list',
  imports: [Header, RechercheAdd],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList {

  protected readonly headerData = signal<HeaderData>({title: 'Liste des Clients', icon: 'users'});

  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par le nom", label: "Nouveau Client"})
}
