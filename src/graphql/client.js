import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { GET_QUEUED_SONGS } from "./queries";

const typeDefs = gql`
  extend type Song {
    id: uuid!
    title: String!
    artist: String!
    thumbnail: String!
    duration: Float!
    url: String!
  }

  input SongInput {
    id: uuid!
    title: String!
    artist: String!
    thumbnail: String!
    duration: Float!
    url: String!
  }

  extend type Query {
    queue: [Song]!
  }

  extend type Mutation {
    addOrRemoveFromQueue(input: SongInput!): [Song]!
  }
`;

const hasQueue = Boolean(localStorage.getItem("queue"));

const data = {
  queue: hasQueue ? JSON.parse(localStorage.getItem("queue")) : [],
};

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
  typeDefs,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS,
        });

        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input];
          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue },
          });
          return newQueue;
        }
        return [];
      },
    },
  },
});

client.writeQuery({ query: GET_QUEUED_SONGS, data });

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
