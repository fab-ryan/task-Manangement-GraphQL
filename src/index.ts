import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";
import { context } from "./schema/context";

export const server = new ApolloServer({
  schema,
});

const port = process.env.PORT || 4000;
startStandaloneServer(server, {
  listen: { port: Number(port) },
  context: async () => context,
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
