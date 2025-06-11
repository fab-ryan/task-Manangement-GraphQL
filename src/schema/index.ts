import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "../types";

export const schema = makeSchema({
  types: [types],
  outputs: {
    schema: join(process.cwd(), "src", "generated", "schema.graphql"),
    typegen: join(process.cwd(), "src", "generated", "nexus.ts"),
  },
  contextType: {
    module: join(process.cwd(), "src", "schema", "context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: join(process.cwd(), "src", "queries", "index.ts"),
        alias: "queries",
      },
    ],
    skipTypes: ["Query", "Mutation", "Subscription"],
  },
});
