import { gql } from '@apollo/client';

export const LOGOUT_MUTATION = gql`
    mutation LogoutUser {
        logoutUser {
            message
        }
    }
`;
