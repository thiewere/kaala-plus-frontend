import { Currency, Order } from "../orders/order.model";

export interface Payment {
    id: number,
    order: Order,
    currency: Currency,
    amount: number,
    paymentDate: string,
    paymentType: string,
    note: string,
    createdAt: string,
    updatedAt: string
}