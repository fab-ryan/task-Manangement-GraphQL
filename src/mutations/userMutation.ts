import { extendType } from "nexus";
import * as bcrypt from "bcryptjs";
import { stringArg, booleanArg, nonNull, arg, nullable, enumType } from "nexus";
import { NexusGenRootTypes } from "../generated/nexus";
import { Role } from "@prisma/client";
import { requireRole, uploadFile } from "../utils";

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
    t.field("activateUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(
        root,
        args,
        context,
        info
      ): Promise<NexusGenRootTypes["User"]> {
        requireRole(["admin"], context.role);
        const { id } = args;
        const user = await context.prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const updatedUser = await context.prisma.user.update({
          where: { id },
          data: {
            status: !user.status,
            updatedAt: new Date(),
          },
        });
        return {
          ...updatedUser,
          createdAt: user.createdAt.toISOString(),
          updatedAt: updatedUser.updatedAt.toISOString(),
        };
      },
    });
    t.field("createProfile", {
      type: "Profile",
      args: {
        userId: nonNull(stringArg()),
        phone: stringArg(),
        address: stringArg(),
        city: stringArg(),
        state: stringArg(),
        zip: stringArg(),
      },
      async resolve(
        root,
        args,
        context,
        info
      ): Promise<NexusGenRootTypes["Profile"]> {
        requireRole(["admin", "user"], context.role);
        const { userId, phone, address, city, state, zip } = args;
        const profile = await context.prisma.profile.create({
          data: {
            userId,
            phone,
            address,
            city,
            state,
            zip,
          },
        });
        return {
          ...profile,
          createdAt: profile.createdAt.toISOString(),
          updatedAt: profile.updatedAt.toISOString(),
        };
      },
    });
  },
});
