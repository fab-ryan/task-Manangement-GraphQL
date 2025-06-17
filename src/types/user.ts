import { objectType, inputObjectType } from "nexus";

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

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.id("id", { description: "The id of the profile" });
    t.nonNull.id("userId", { description: "The user id of the profile" });
    t.nullable.string("phone", { description: "The phone of the profile" });
    t.nullable.string("address", { description: "The address of the profile" });
    t.nullable.string("city", { description: "The city of the profile" });
    t.nullable.string("state", { description: "The state of the profile" });
    t.nullable.string("zip", { description: "The zip of the profile" });
    t.string("profilePictureUrl", {
      description: "The profile picture url of the profile",
    });
    t.nullable.boolean("isVerified", {
      description: "The is verified of the profile",
    });
    t.nullable.string("createdAt", {
      description: "The date and time the profile was created",
    });
    t.nullable.string("updatedAt", {
      description: "The date and time the profile was updated",
    });
  },
});
export const Upload = inputObjectType({
  name: "Upload",
  definition(t) {
    t.nonNull.string("filename", { description: "The filename of the upload" });
    t.nonNull.string("mimetype", { description: "The mimetype of the upload" });
    t.nonNull.string("encoding", { description: "The encoding of the upload" });
  },
});

export const UserProfile = objectType({
  name: "UserProfile",
  definition(t) {
    t.nonNull.field("user", {
      type: "User",
      description: "The user of the profile",
    });
    t.nullable.field("profile", {
      type: "Profile",
      description: "The profile of the user",
    });
  },
});
