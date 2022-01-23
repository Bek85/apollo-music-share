import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: `wss://${import.meta.env.VITE_HASURA_GRAPHQL_API}`,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_SECRET,
        },
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

/* // ! connection via https
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://react-music-share.hasura.app/v1/graphql",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_SECRET,
    },
  }),
});

export default client;

*/
