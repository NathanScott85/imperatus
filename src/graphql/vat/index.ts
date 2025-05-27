import { gql } from '@apollo/client';

export const GET_ALL_VAT_RECORDS = gql`
    query GetAllVATRecords($page: Int, $limit: Int) {
        getAllVATRecords(page: $page, limit: $limit) {
            vatRecords {
                id
                orderId
                orderNumber
                vatAmount
                subtotal
                total
                status
                createdAt
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;
