import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                email
                password
                fullname
                address
                postcode
                phone
                userRoles {
                    role {
                        name
                    }
                }
                id
            }
        }
    }
`;
