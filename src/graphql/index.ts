import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGqlServer() {
  // create gql server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        ${User.queries}
    }
    type Mutation {
        ${User.mutations}
    }
    `, // schemas
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGqlServer;
