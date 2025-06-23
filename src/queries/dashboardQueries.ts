import { extendType } from "nexus";
import { requireRole } from "../utils/help";

export const DashboardQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("getDashboard", {
      type: "Dashboard",
      resolve: async (root, args, context, info) => {
        requireRole(["admin", "user"], context.role);
        const currentUser = await context.prisma.user.findFirstOrThrow({
          where: {
            id: context.userId as string,
          },
        });
        if (!currentUser) {
          throw new Error("User not found");
        }

        const totalTasks = await context.prisma.task.count({
          where: {
            userId: currentUser.id,
          },
        });
        const completedTasks = await context.prisma.task.count({
          where: {
            status: "COMPLETED",
            userId: currentUser.id,
          },
        });
        const pendingTasks = await context.prisma.task.count({
          where: {
            status: "PENDING",
            userId: currentUser.id,
          },
        });
        const inProgressTasks = await context.prisma.task.count({
          where: {
            status: "IN_PROGRESS",
            userId: currentUser.id,
          },
        });
        const totalUsers = await context.prisma.user.count();
        const activeUsers = await context.prisma.user.count({
          where: {
            status: true,
            id: currentUser.id,
          },
        });
        const inactiveUsers = await context.prisma.user.count({
          where: {
            status: false,
            id: currentUser.id,
          },
        });
        const tasksByCategory = await context.prisma.task.groupBy({
          by: ["category"],
          _count: true,
          where: {
            userId: currentUser.id,
          },
        });
        const tasksByPriority = await context.prisma.task.groupBy({
          by: ["priority"],
          _count: true,
          where: {
            userId: currentUser.id,
          },
        });
        const overallProgress =
          totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        return {
          totalTasks: totalTasks,
          completedTasks: completedTasks,
          pendingTasks: pendingTasks,
          inProgressTasks: inProgressTasks,
          totalUsers: totalUsers,
          activeUsers: activeUsers,
          inactiveUsers: inactiveUsers,
          tasksByCategory: tasksByCategory,
          tasksByPriority: tasksByPriority,
          overallProgress: overallProgress,
        };
      },
    });
  },
});
