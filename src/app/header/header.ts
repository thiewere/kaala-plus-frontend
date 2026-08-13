import { Component, input } from '@angular/core';
import { PIcon } from "@primeicons/angular/p-icon";
import { HeaderData } from './header-data.model';

@Component({
  selector: 'app-header',
  imports: [PIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  header = input.required<HeaderData>();
}
