import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
            img
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
