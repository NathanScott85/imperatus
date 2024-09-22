import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
    query Products {
        products {
            totalCount
            totalPages
            currentPage
            products {
                id
                name
                price
                type
                rrp
                description
                preorder
                category {
                    id
                    name
                    description
                }
                img {
                    id
                    url
                    key
                    fileName
                    contentType
                    createdAt
                }
                stock {
                    id
                    amount
                    sold
                    instock
                    soldout
                    preorder
                }
            }
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation CreateProduct(
        $name: String!
        $price: Float!
        $type: String!
        $description: String
        $img: Upload
        $categoryId: Int!
        $stock: StockInput!
        $preorder: Boolean!
        $rrp: Float
    ) {
        createProduct(
            name: $name
            price: $price
            type: $type
            description: $description
            img: $img
            categoryId: $categoryId
            stock: $stock
            preorder: $preorder
            rrp: $rrp
        ) {
            id
            name
            img {
                id
                url
                key
                fileName
                contentType
                createdAt
            }
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct(
        $id: ID!
        $name: String
        $price: Float
        $type: String
        $description: String
        $img: Upload
        $categoryId: Int # Changed from String to Int
        $stockAmount: Int
        $stockSold: Int
        $stockInstock: String
        $stockSoldout: String
        $stockPreorder: String
        $preorder: Boolean
        $rrp: Float
    ) {
        updateProduct(
            id: $id
            name: $name
            price: $price
            type: $type
            description: $description
            img: $img
            categoryId: $categoryId
            stockAmount: $stockAmount
            stockSold: $stockSold
            stockInstock: $stockInstock
            stockSoldout: $stockSoldout
            stockPreorder: $stockPreorder
            preorder: $preorder
            rrp: $rrp
        ) {
            id
            name
            price
            type
            description
            preorder
            rrp
            img {
                id
                url
                fileName
            }
            stock {
                amount
                sold
                instock
                soldout
                preorder
            }
            category {
                id
                name
                description
            }
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            message
        }
    }
`;
