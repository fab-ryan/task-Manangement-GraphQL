import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id", { description: "The id of the user" });
    t.nonNull.string("name", { description: "The name of the user" });
    t.nonNull.string("email", { description: "The email of the user" });
    t.nonNull.string("password", { description: "The password of the user" });
    t.nonNull.string("role", { description: "The role of the user" });
    t.nonNull.boolean("status", { description: "The status of the user" });
    t.nonNull.string("createdAt", {
      description: "The date and time the user was created",
    });
    t.nonNull.string("updatedAt", {
      description: "The date and time the user was updated",
    });
  },
});
