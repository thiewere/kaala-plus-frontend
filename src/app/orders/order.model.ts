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

export interface Client {
    id: number,
    firstname: string,
    lastname: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string
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

export interface SupplierProduct {
    id: number,
    supplier: Supplier,
    product: Product,
    unitPrice: number
}

export interface Supplier {
    id: number,
    name: string,
    phone: string,
    address: string,
    createdAt: string,
    updatedAt: string
}

export interface Product {
    id: number,
    name: string
}