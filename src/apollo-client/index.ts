import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
} from '@apollo/client';

const isProduction = process.env.NODE_ENV === 'production';
const apiUri = isProduction
    ? 'https://your-production-api.com/graphql' // temporary for now
    : 'http://localhost:4000/graphql';

const credentialsPolicy = isProduction ? 'include' : 'same-origin';

const httpLink = new HttpLink({
    uri: apiUri,
    credentials: credentialsPolicy,
});

const authLink = new ApolloLink((operation, forward) => {
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
