import { Product } from "../products/product.model"

export interface Supplier {
    id: number,
    name: string,
    phone: string,
    address: string,
    createdAt: string,
    updatedAt: string
}

export interface SupplierProduct {
    id: number,
    supplier: Supplier,
    product: Product,
    unitPrice: number
}