import { objectType } from "nexus";

export const Auth = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("accessToken", {
      description: "The access token of the user",
    });
    t.nonNull.string("refreshToken", {
      description: "The refresh token of the user",
    });
  },
});
export const AuthRefreshToken = objectType({
  name: "AuthRefreshToken",
  definition(t) {
    t.nonNull.string("accessToken", {
      description: "The access token of the user",
    });
    t.nullable.string("refreshToken", {
      description: "The refresh token of the user",
    });
  },
});
