import { Client } from "../clients/client-list/client.model"
import { Product } from "../products/product.model"
import { Supplier, SupplierProduct } from "../suppliers/supplier.model"

export interface OrderProduct{
    id?: number,
    order?: Order,
    currency?: Currency,
    quantity: number,
    unitPrice: number,
    totalPrice: number,
    supplierProduct: SupplierProduct
}

export interface Order {
    id: number,
    reference: string,
    client: Client,
    createdAt: string,
    completedAt: string,
    orderState: string,
    updatedAt: string,
    currency: Currency,
    container: Container

}

export interface Currency {
    id: number,
    name: string
}

export interface Container {
    id: number,
    reference: string,
    createdAt: string,
    updatedAt: string
}

export interface CreateOrderItemRequest {
    supplierProductId: number;
    quantity: number;
    unitPrice: number
}

export interface CreateCompleteOrderRequest {
    clientId: number;
    currency: string;
    description: string,
    items: CreateOrderItemRequest[]
}

export interface CreateOrderResponse {
    id: number;
    reference: string,
    state: string
}

export interface CreateOrderRequest {
    clientId: number;
    currency?: string |  null;
    description?: string | null,
}

export interface PendingOrderResponse {
    id: number,
    reference: string,
    clientFirstname: string,
    clientLastname: string,
    description: string,
    createdAt: string
}

export interface OrderDetailsResponse {
    id: number,
    clientId: number,
    currency: string,
    description: string,
    state: string
}

export interface CompleteExistingOrderRequest {
    items: CreateOrderItemRequest[];
}

export interface OrderForPayment {
  reference: string;
  clientFirstname: string;
  clientLastname: string;
  totalAmount: number;
  currency: string;
  orderState: 'CONFIRMED' | 'IN_PROGRESS';
}