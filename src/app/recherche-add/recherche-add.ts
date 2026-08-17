import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RechercheAddData } from './recherche-add-data.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-recherche-add',
  imports: [ButtonModule, RouterLink],
  templateUrl: './recherche-add.html',
  styleUrl: './recherche-add.scss',
})
export class RechercheAdd {

  value = input.required<RechercheAddData>();
}
