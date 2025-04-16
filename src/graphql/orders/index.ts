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
