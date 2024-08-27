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

export const CREATE_PRODUCT_MUTATION = gql`
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
