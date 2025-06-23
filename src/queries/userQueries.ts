import { extendType, intArg } from "nexus";
import { NexusGenRootTypes } from "../generated/nexus";
import { requireRole } from "../utils";

export const UserQueries = extendType({
  type: "Query",
  definition(u) {
    u.list.field("allUsers", {
      type: "User",
      args: {
        skip: intArg({
          default: 0,
        }),
        take: intArg({
          default: 10,
        }),
      },
      resolve: async (
        root,
        args,
        context,
        info
      ): Promise<NexusGenRootTypes["User"][]> => {
        requireRole(["admin", "user"], context.role);
        const users = await context.prisma.user.findMany({
          skip: (args as any)?.skip || 0,
          take: (args as any)?.take || 10,
        });
        return users.map((user) => ({
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }));
      },
    });
    u.field("getUserProfile", {
      type: "UserProfile",
      resolve: async (
        root,
        args,
        context,
        info
      ): Promise<NexusGenRootTypes["UserProfile"]> => {
        requireRole(["admin", "user"], context.role);
        if (!context.userId) {
          throw new Error("User not found");
        }
        const user = await context.prisma.user.findUnique({
          where: { id: context.userId },
          include: {
            profile: true,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }

        return {
          user: {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          profile: user?.profile as unknown as NexusGenRootTypes["Profile"],
        };
      },
    });
  },
});
