import { GraphQLServer } from "graphql-yoga";
import bodyParser from "body-parser";

import Query from "@resolvers/Query";
import webhookHandler from "@handlers/webhook";
import webHookValidator from "@handlers/webhook.validator";

const resolvers = {
  Query,
};

const server = new GraphQLServer({
  resolvers,
  typeDefs: "./src/schema.graphql",
});

server.express.use(bodyParser.json());
server.express.use("/api/call/webhook", webHookValidator, webhookHandler);

server.start(
  (): void => {
    console.log("Server running at port 4000");
  },
);
