export interface Role {
    id: number;
    name: string;
}

export interface Roles {
    role: Role[];
}

interface Stock {
    amount: number;
    instock: string;
    soldout: string;
    preorder: string;
    sold?: number;
}

export type ProductType = {
    id: number;
    name: string;
    price: number;
    type: string;
    rrp: number;
    description?: string; // put this as optional for now to not have to change the temp mocks
    img: {
        url: string;
    };
    category: {
        name: string;
    };
    stock: Stock;
    preorder?: boolean; // put this as optional for now to not have to change the temp mocks
};

export interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    rrp: number;
    description?: string;
    img: {
        url: string;
    };
    category: {
        name: string;
    };
    stock: Stock;
    preorder: boolean;
}
