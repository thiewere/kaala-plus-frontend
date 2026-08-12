import { Component, computed, input } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { DashboardCardData } from './dashboard-card-data';

@Component({
  selector: 'app-dashboard-card',
  imports: [PIcon],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.scss',
})
export class DashboardCard {
  card = input.required<DashboardCardData>();

}
