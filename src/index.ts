import { GraphQLServer } from "graphql-yoga";

import Query from "./resolvers/Query";

const resolvers = {
  Query,
};

const server = new GraphQLServer({
  resolvers,
  typeDefs: "./src/schema.graphql",
});

server.start(
  (): void => {
    console.log("Server running at port 4000");
  },
);
