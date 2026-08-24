import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { OrderList } from './orders/order-list/order-list';
import { ClientList } from './clients/client-list/client-list';
import { ProductList } from './products/product-list/product-list';
import { SupplierList } from './suppliers/supplier-list/supplier-list';
import { PaymentList } from './payments/payment-list/payment-list';
import { ExpenseList } from './expenses/expense-list/expense-list';
import { ClientForm } from './clients/client-form/client-form';
import { OrderForm } from './orders/order-form/order-form';

export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'orders', component: OrderList},
    {path: 'orders/create', component: OrderForm},
    {path: 'clients', component: ClientList},
    {path: 'clients/create', component: ClientForm},
    {path: 'products', component: ProductList},
    {path: 'suppliers', component: SupplierList},
    {path: 'payments', component: PaymentList},
    {path: 'expenses', component: ExpenseList},
    
];
