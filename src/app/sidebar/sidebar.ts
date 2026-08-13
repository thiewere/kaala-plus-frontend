import { Component, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { PIcon } from '@primeicons/angular/p-icon';
import { SidebarItemData } from './sidebar-item-data';
import { SIDEBAR_ITEMS } from './data/sidebar-items.data';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, PIcon, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar{


 
  
 LINKS = signal<SidebarItemData[]>(SIDEBAR_ITEMS);

}
