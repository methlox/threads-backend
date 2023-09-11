import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  // parse all the json responses
  app.use(express.json());

  // create gql server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        hello: String
        say(name: String): String
    }
    type Mutation {
      createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
    }
    `, // schemas
    resolvers: {
      Query: {
        hello: () => `whats poppin`,
        say: (_, { name }: { name: String }) => `Hey ${name}, whats going on?`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: "random_salt",
            },
          });
          return true;
        },
      },
    }, // functions which will execute
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "server is running" });
  });

  // expose our gql server to port
  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
