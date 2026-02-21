/* Client do apollo para comunicação com o backend GraphQL. Configura o link HTTP e o cache em memória. */
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache()
});