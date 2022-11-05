import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { useMemo } from "react";

// Apollo Client Setup

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
    cache: new InMemoryCache(),
  });
}

export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
