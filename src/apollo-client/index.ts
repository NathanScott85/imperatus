import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
} from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the refresh token from localStorage
    const refreshToken = localStorage.getItem('refreshToken');

    // Set the authorization headers with the refresh token
    operation.setContext({
        headers: {
            'x-refresh-token': refreshToken || '', // Add refresh token to headers
        },
    });

    // Call the next link in the middleware chain
    return forward(operation);
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink), // Combine authLink with httpLink
    cache: new InMemoryCache(),
});
