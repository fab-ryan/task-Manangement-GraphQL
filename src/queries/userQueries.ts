import { extendType } from "nexus";
import { NexusGenRootTypes } from "../generated/nexus";

export const UserQueries = extendType({
  type: "Query",
  definition(u) {
    u.list.field("allUsers", {
      type: "User",
      resolve: async (
        root,
        args,
        context,
        info
      ): Promise<NexusGenRootTypes["User"][]> => {
        const users = await context.prisma.user.findMany({
          where: {
            status: true,
          },

          take: 10,
        });
        return users.map((user) => ({
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }));
      },
    });
  },
});
