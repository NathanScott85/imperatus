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
    mutation CreateDiscountCode($input: CreateDiscountCodeInput!) {
        createDiscountCode(input: $input) {
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

export const UPDATE_DISCOUNT_CODE = gql`
    mutation UpdateDiscountCode(
        $id: Int!
        $code: String
        $description: String
        $type: String
        $value: Float
        $expiresAt: String
        $active: Boolean
    ) {
        updateDiscountCode(
            id: $id
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
        }
    }
`;

export const DELETE_DISCOUNT_CODE = gql`
    mutation DeleteDiscountCode($id: Int!) {
        deleteDiscountCode(id: $id)
    }
`;
