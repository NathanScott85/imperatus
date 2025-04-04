import { gql } from '@apollo/client';

export const GET_VERIFICATION_STATUS = gql`
    query GetVerificationStatus($userId: Int!) {
        getVerificationStatus(userId: $userId) {
            emailVerified
            message
        }
    }
`;
