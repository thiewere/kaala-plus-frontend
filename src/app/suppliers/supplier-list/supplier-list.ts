import { Component, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from "../../header/header";
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { RechercheAdd } from "../../recherche-add/recherche-add";

@Component({
  selector: 'app-supplier-list',
  imports: [Header, RechercheAdd],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.scss',
})
export class SupplierList {

  protected readonly headerData = signal<HeaderData>({title: "Liste des Fournisseurs", icon: "building"});

  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par le nom", label: "Nouveau Fournisseur"});
 

}
