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
    query GetCategoryById($id: Int!) {
        category(id: $id) {
            id
            name
            img
            products {
                id
                name
                price
                img
                description
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
