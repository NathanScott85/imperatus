import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
            description
            img {
                id
                fileName
                url
                key
                contentType
                createdAt
            }
        }
    }
`;

export const GET_CATEGORY_BY_ID = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            id
            name
            description
            img {
                url
                fileName
                contentType
            }
            products {
                id
                name
                price
                rrp
                img {
                    url
                    fileName
                    contentType
                }
                description
                stock {
                    amount
                    sold
                    instock
                    soldout
                }
            }
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation CreateCategory(
        $name: String!
        $description: String!
        $img: Upload!
    ) {
        createCategory(name: $name, description: $description, img: $img) {
            id
            name
            description
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

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory(
        $id: String!
        $name: String!
        $description: String!
        $img: Upload
    ) {
        updateCategory(
            id: $id
            name: $name
            description: $description
            img: $img
        ) {
            id
            name
            description
            img {
                id
                url
                fileName
            }
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id) {
            message
        }
    }
`;
