import { Component, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from "../../header/header";

@Component({
  selector: 'app-supplier-list',
  imports: [Header],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.scss',
})
export class SupplierList {

  protected readonly headerData = signal<HeaderData>({title: "Liste des Fournisseurs", icon: "building"})
 

}
