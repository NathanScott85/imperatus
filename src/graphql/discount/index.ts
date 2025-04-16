import { gql } from '@apollo/client';

export const GET_DISCOUNT_CODES = gql`
    query GetAllDiscountCodes($page: Int, $limit: Int, $search: String) {
        getAllDiscountCodes(page: $page, limit: $limit, search: $search) {
            discountCodes {
                id
                code
                description
                type
                value
                active
                expiresAt
                createdAt
                updatedAt
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;

export const CREATE_DISCOUNT_CODE = gql`
    mutation CreateDiscountCode(
        $code: String!
        $description: String
        $type: String!
        $value: Float!
        $expiresAt: String
        $active: Boolean
    ) {
        createDiscountCode(
            code: $code
            description: $description
            type: $type
            value: $value
            expiresAt: $expiresAt
            active: $active
        ) {
            id
            code
            description
            type
            value
            active
            expiresAt
            createdAt
            updatedAt
        }
    }
`;
