import { Client } from "../clients/client-list/client.model"
import { Product } from "../products/product.model"
import { Supplier, SupplierProduct } from "../suppliers/supplier.model"

export interface OrderProduct{
    id: number,
    order: Order,
    currency: Currency,
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



