export interface Payment {
    id: number;
    orderReference: string;
    amount: number;
    currency: string;
    exchangeRate: number;
    convertedAmount: number;
    paymentType: 'PARTIAL' | 'FINAL';
    paymentDate: string;
    note: string | null;
    clientFirstname: string;
    clientLastname: string;
    orderCurrency: string;
}

export interface CreatePaymentRequest {
    orderReference: string;
    amount:         number;
    currencyId:     number;
    exchangeRate:   number;
    paymentDate:    string;
    note:           string;
}