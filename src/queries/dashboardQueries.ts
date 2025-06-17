import { extendType } from "nexus";
import { requireRole } from "../utils/help";

export const DashboardQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("getDashboard", {
      type: "Dashboard",
      resolve: async (root, args, context, info) => {
        requireRole(["admin"], context.role);
        const totalTasks = await context.prisma.task.count();
        const completedTasks = await context.prisma.task.count({
          where: {
            status: "COMPLETED",
          },
        });
        const pendingTasks = await context.prisma.task.count({
          where: {
            status: "PENDING",
          },
        });
        const inProgressTasks = await context.prisma.task.count({
          where: {
            status: "IN_PROGRESS",
          },
        });
        const totalUsers = await context.prisma.user.count();
        const activeUsers = await context.prisma.user.count({
          where: {
            status: true,
          },
        });
        const inactiveUsers = await context.prisma.user.count({
          where: {
            status: false,
          },
        });
        const tasksByCategory = await context.prisma.task.groupBy({
          by: ["category"],
          _count: true,
        });
        const tasksByPriority = await context.prisma.task.groupBy({
          by: ["priority"],
          _count: true,
        });
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
        };
      },
    });
  },
});
