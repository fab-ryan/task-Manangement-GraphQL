import { GraphQLError } from "graphql";

export class UnauthorizedError extends GraphQLError {
  constructor(
    message = "You are not authorized to perform this action.",
    statusCode = 401
  ) {
    super(message, {
      extensions: {
        code: "UNAUTHORIZED",
        http: {
          status: statusCode,
        },
        stacktrace: undefined,
      },
    });
  }
}
