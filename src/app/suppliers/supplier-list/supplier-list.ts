import { Component, inject, signal } from '@angular/core';
import { HeaderData } from '../../header/header-data.model';
import { Header } from "../../header/header";
import { RechercheAddData } from '../../recherche-add/recherche-add-data.model';
import { RechercheAdd } from "../../recherche-add/recherche-add";
import { TableModule } from 'primeng/table';
import { SupplierService } from '../supplier-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SupplierItem } from "../supplier-item/supplier-item";

@Component({
  selector: 'app-supplier-list',
  imports: [Header, RechercheAdd, TableModule, SupplierItem],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.scss',
})
export class SupplierList {

  protected readonly headerData = signal<HeaderData>({title: "Liste des Fournisseurs", icon: "building"});

  protected readonly searchAddFieldData = signal<RechercheAddData>({placeholder: "Rechercher par le nom", label: "Nouveau Fournisseur"});
 
  supplierService = inject(SupplierService);

  suppliers = toSignal(this.supplierService.getSuppliers());
}
