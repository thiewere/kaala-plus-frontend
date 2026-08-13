import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RechercheAddData } from './recherche-add-data.model';

@Component({
  selector: 'app-recherche-add',
  imports: [ButtonModule],
  templateUrl: './recherche-add.html',
  styleUrl: './recherche-add.scss',
})
export class RechercheAdd {

  value = input.required<RechercheAddData>();
}
