import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            accessToken
            refreshToken
            user {
                email
                password
                fullname
                address
                postcode
                city
                dob
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
