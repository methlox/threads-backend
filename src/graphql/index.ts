import { ApolloServer } from "@apollo/server";

async function createApolloGqlServer() {
  // create gql server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
    }
    type Mutation {
    }
    `, // schemas
    resolvers: {
      Query: {},
      Mutation: {}
        },
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGqlServer;
