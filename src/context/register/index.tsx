import React, { createContext, ReactNode, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { client } from '../../apollo-client';

interface RegisterContextProps {
    data: any;
    loading: boolean;
    error: any;
    handleRegisterUser: (data: {
        fullname: string;
        email: string;
        password: string;
        dob: string;
        phone: string;
        address: string;
        city: string;
        postcode: string;
        admin: boolean;
    }) => Promise<void>;
}

const RegisterContext = createContext<RegisterContextProps | null>(null);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
    const REGISTER_USER = gql`
        mutation RegisterUser(
            $fullname: String!
            $email: String!
            $password: String!
            $dob: String!
            $phone: String!
            $address: String!
            $city: String!
            $postcode: String!
            $admin: Boolean!
        ) {
            createUser(
                fullname: $fullname
                email: $email
                password: $password
                dob: $dob
                phone: $phone
                address: $address
                city: $city
                postcode: $postcode
                admin: $admin
            ) {
                id
                fullname
                email
                dob
                phone
                address
                city
                postcode
                admin
            }
        }
    `;

    const [registerUser, { data, loading, error }] = useMutation(
        REGISTER_USER,
        {
            client,
        },
    );

    const handleRegisterUser = async (input: {
        fullname: string;
        email: string;
        password: string;
        dob: string;
        phone: string;
        address: string;
        city: string;
        postcode: string;
        admin: boolean;
    }) => {
        try {
            await registerUser({ variables: input });
        } catch (err) {
            console.error('Mutation error:', err);
            throw err;
        }
    };

    return (
        <RegisterContext.Provider
            value={{
                data,
                loading,
                error,
                handleRegisterUser,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegisterContext = () => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error(
            'useRegisterContext must be used within a RegisterProvider',
        );
    }
    return context;
};
