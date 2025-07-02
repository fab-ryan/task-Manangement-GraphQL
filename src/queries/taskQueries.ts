import { extendType, intArg, arg, stringArg } from "nexus";
import { requireRole } from "../utils";

export const TaskQueries = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllTasks", {
      type: "Task",
      args: {
        skip: intArg({
          default: 0,
        }),
        take: intArg({
          default: 10,
        }),
        filter: arg({
          type: "TaskFilter",
        }),
        sort: arg({
          type: "TaskSort",
        }),
      },
      resolve: async (root, args, context, info) => {
        requireRole(["admin", "user"], context.role);
        if (!context.userId) {
          throw new Error("User not found");
        }
        const { skip, take, filter, sort } = args;
        const tasks = await context.prisma.task.findMany({
          skip: skip || 0,
          take: take || 10,
          where: {
            userId: context.userId,
            ...(filter || {}),
            title: filter?.title ? { contains: filter.title } : undefined,
            description: filter?.description
              ? { contains: filter.description }
              : undefined,
            category: filter?.category
              ? { equals: filter.category }
              : undefined,
            priority: filter?.priority
              ? { equals: filter.priority }
              : undefined,
            status: filter?.status ? { equals: filter.status } : undefined,
            dueDate: filter?.dueDate ? { equals: filter.dueDate } : undefined,
          },
          orderBy: {
            createdAt: sort?.createdAt || "desc",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
        console.log(tasks);
        return tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          dueDate: task.dueDate.toISOString(),
          startDate: task.startDate.toISOString(),
          user: {
            id: task.user.id,
            name: task.user.name,
            email: task.user.email,
          },
        }));
      },
    });
    t.field("getTaskById", {
      type: "Task",
      args: {
        id: stringArg(),
      },
      resolve: async (root, args, context, info) => {
        requireRole(["admin", "user"], context.role);
        const { id } = args;
        const task = await context.prisma.task.findUnique({
          where: { id: id || "" },
        });
        if (!task) {
          throw new Error("Task not found");
        }
        return {
          ...task,
          createdAt: task?.createdAt.toISOString(),
          updatedAt: task?.updatedAt.toISOString(),
          startDate: task?.startDate.toISOString(),
          dueDate: task?.dueDate.toISOString(),
        };
      },
    });
  },
});
