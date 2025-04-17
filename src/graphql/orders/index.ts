import { gql } from '@apollo/client';

export const GET_ALL_ORDERS = gql`
    query GetAllOrders($page: Int, $limit: Int, $search: String) {
        getAllOrders(page: $page, limit: $limit, search: $search) {
            orders {
                id
                orderNumber
                email
                total
                subtotal
                status
                createdAt
                updatedAt
                discountCode {
                    id
                    code
                }
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;

export const GET_ALL_STATUS = gql`
    query GetAllStatus {
        getAllStatus {
            id
            value
            label
        }
    }
`;

export const CREATE_ORDER_STATUS = gql`
    mutation createStatus($value: String!, $label: String!) {
        createStatus(value: $value, label: $label) {
            id
            value
            label
        }
    }
`;

export const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($id: Int!, $value: String!, $label: String!) {
        updateOrderStatus(id: $id, value: $value, label: $label) {
            id
            value
            label
        }
    }
`;

export const DELETE_ORDER_STATUS = gql`
    mutation DeleteOrderStatus($id: Int!) {
        deleteOrderStatus(id: $id) {
            success
            message
        }
    }
`;
