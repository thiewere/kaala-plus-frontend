import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { OrderList } from './orders/order-list/order-list';

export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'orders', component: OrderList},
    
];
