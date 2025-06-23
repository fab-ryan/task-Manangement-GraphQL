import { objectType, extendType, nonNull, stringArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils";

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(root, args, context, info) {
        const { email, password } = args;
        const user = await context.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (!user.status) {
          console.log("User is not active", user);
          throw new Error("User is not active");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid password");
        }
        const token = jwt.sign(
          { userId: user.id, role: user.role },
          APP_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = jwt.sign(
          { userId: user.id, role: user.role },
          APP_SECRET,
          {
            expiresIn: "7d",
          }
        );
        return { accessToken: token, refreshToken };
      },
    });
    t.nonNull.field("refreshToken", {
      type: "AuthRefreshToken",
      args: {
        refreshToken: nonNull(stringArg()),
      },
      async resolve(root, args, context, info) {
        const { refreshToken } = args;
        const decoded = jwt.verify(refreshToken, APP_SECRET) as {
          userId: string;
        };
        const user = await context.prisma.user.findUnique({
          where: { id: decoded.userId },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const token = jwt.sign(
          { userId: user.id, role: user.role },
          APP_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const newRefreshToken = jwt.sign(
          { userId: user.id, role: user.role },
          APP_SECRET,
          {
            expiresIn: "7d",
          }
        );
        return { accessToken: token, refreshToken: newRefreshToken };
      },
    });
  },
});
