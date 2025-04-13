import { gql } from '@apollo/client';

export const VERIFY_EMAIL = gql`
    mutation VerifyEmail($token: String!) {
        verifyEmail(token: $token) {
            message
        }
    }
`;

export const SEND_VERIFICATION_EMAIL = gql`
  mutation SendVerificationEmail($userId: Int!) {
    sendVerificationEmail(userId: $userId) {
      message
    }
  }
`;

export const GET_VERIFICATION_STATUS = gql`
    query GetVerificationStatus($userId: Int!) {
        getVerificationStatus(userId: $userId) {
            emailVerified
            message
        }
    }
`;

export const RESEND_VERIFICATION_EMAIL = gql`
  mutation ResendVerificationEmail($userId: Int!) {
    resendVerificationEmail(userId: $userId) {
      message
    }
  }
`;
