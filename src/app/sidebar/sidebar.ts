import { Component, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { PIcon } from '@primeicons/angular/p-icon';

@Component({
  selector: 'app-sidebar',
  imports: [ ButtonModule, PIcon ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar{


 NAV_LINKS = [
  {
    id: 0,
    label: 'Dashboard', 
    icon: 'home'
  },
  {
    id: 1,
    label: 'Commandes', 
    icon: 'shopping-cart'
  },
  {
    id: 2,
    label: 'Clients', 
    icon: 'users'
  },
  {
    id: 3,
    label: 'Catalogue', 
    icon: 'shop'
  },
  {
    id: 4,
    label: 'Historique', 
    icon: 'history'
  }
  
 ]
  
 LINS = signal(this.NAV_LINKS);

}
