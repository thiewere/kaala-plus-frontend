import { Currency, Order } from "../orders/order.model";

export interface Expense {
    id: number,
    expenseType: string,
    order: Order,
    currency: Currency,
    description: string,
    expenseDate: string,
    amount: number,
    createdAt: string,
    updatedAt: string
}