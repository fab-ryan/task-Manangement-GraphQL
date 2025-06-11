import { extendType } from "nexus";
import * as bcrypt from "bcryptjs";
import { stringArg, booleanArg, nonNull, arg, nullable, enumType } from "nexus";
import { NexusGenRootTypes } from "../generated/nexus";
import { Role } from "@prisma/client";

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        role: nullable(
          enumType({
            name: "Role",
            members: ["ADMIN", "USER"],
            description: "The role of the user",
          })
        ),
        status: nonNull(booleanArg({ default: true })),
      },
      async resolve(
        root,
        args,
        context,
        info
      ): Promise<NexusGenRootTypes["User"]> {
        const { name, email, password, role, status } = args;
        const currentUser = await context.prisma.user.findUnique({
          where: { email },
        });
        if (currentUser) {
          throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await context.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role: role as Role,
            status,
          },
        });
        return {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        };
      },
    });
  },
});
