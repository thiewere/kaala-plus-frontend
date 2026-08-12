import { Component, signal } from '@angular/core';
import { DashboardCard } from "./dashboard-card/dashboard-card";
import { DashboardCardData } from './dashboard-card/dashboard-card-data';
import { DASHBOARD_CARDS } from './data/dashboard-cards.data';


@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  cards = signal<DashboardCardData[]>(DASHBOARD_CARDS)
}
