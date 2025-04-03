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
    description?: string;
    img: {
        url: string;
    };
    category: {
        id: any;
        name: string;
        description: string;
        slug: string;
    };
    slug: string;
    stock: Stock;
    preorder?: boolean;
    set: any;
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
        id: string;
        name: string;
        slug: string;
    };
    stock: Stock;
    preorder: boolean;
}
