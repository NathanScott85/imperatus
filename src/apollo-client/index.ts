import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

export const client = new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
});
