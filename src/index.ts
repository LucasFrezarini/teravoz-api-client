import { GraphQLServer, PubSub } from "graphql-yoga";
import bodyParser from "body-parser";

import Query from "@resolvers/Query";
import Subscription from "@resolvers/Subscription";
import webhookHandler from "@handlers/webhook";
import webHookValidator from "@handlers/webhook.validator";

const resolvers = {
  Query,
  Subscription,
};

const pubSub = new PubSub();
const context = { pubSub };

const server = new GraphQLServer({
  resolvers,
  context,
  typeDefs: "./src/schema.graphql",
});

server.express.use(bodyParser.json());
server.express.use(
  "/api/call/webhook",
  webHookValidator,
  webhookHandler(context),
);

server.start(
  {
    playground: "/playground",
  },
  (): void => {
    console.log("Server running at port 4000");
  },
);
