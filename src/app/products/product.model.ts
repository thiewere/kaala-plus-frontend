export interface Product {
    id: number,
    name: string;
    brand: string | null;
    description: string | null;
}

export interface CreateProductAndSupplierRequest {
    name:            string;
    brand:           string | null;
    description:     string | null;
    supplierName:    string;
    supplierPhone:   string;
    supplierAddress: string | null;
    unitPrice:       number;
    currency:        string;
}

export interface CreateProductWithSupplierRequest {
    name:            string;
    brand:           string | null;
    description:     string | null;
    supplierId:      number;
    unitPrice:       number;
    currency:        string;
}

export interface CreateSupplierProductResponse {
    id:              number;
    productId:       number;
    supplierId:      number;
    unitPrice:       number;
    currency:        string;
}



