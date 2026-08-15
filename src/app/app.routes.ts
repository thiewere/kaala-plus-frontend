import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { OrderList } from './orders/order-list/order-list';
import { ClientList } from './clients/client-list/client-list';
import { ProductList } from './products/product-list/product-list';
import { SupplierList } from './suppliers/supplier-list/supplier-list';
import { PaymentList } from './payments/payment-list/payment-list';

export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'orders', component: OrderList},
    {path: 'clients', component: ClientList},
    {path: 'products', component: ProductList},
    {path: 'suppliers', component: SupplierList},
    {path: 'payments', component: PaymentList},
    
];
