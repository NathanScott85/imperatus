// src/graphql/sendVerificationEmail.js
import { gql } from '@apollo/client';

export const SEND_VERIFICATION_EMAIL = gql`
    mutation SendVerificationEmail($userId: Int!) {
        sendVerificationEmail(userId: $userId) {
            message
        }
    }
`;
