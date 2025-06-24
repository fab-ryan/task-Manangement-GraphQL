import { arg, extendType, nonNull, stringArg } from "nexus";
import { requireRole } from "../utils";

export const TaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        category: nonNull(arg({ type: "Category" })),
        priority: nonNull(arg({ type: "Priority" })),
        startDate: nonNull(
          stringArg({
            description: "The start date of the task",
          })
        ),
        dueDate: nonNull(
          stringArg({
            description: "The due date of the task",
          })
        ),
      },
      async resolve(root, args, context, info) {
        requireRole(["admin", "user"], context.role);
        if (!context.userId) {
          throw new Error("User not found");
        }
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.userId,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const { title, description, category, priority, dueDate, startDate } =
          args;
        const task = await context.prisma.task.create({
          data: {
            title,
            description,
            category,
            priority,
            startDate: new Date(startDate || new Date()),
            dueDate: new Date(dueDate),
            status: "IN_PROGRESS",
            userId: context.userId || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
        return {
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          startDate: task.startDate.toISOString(),
          dueDate: task.dueDate.toISOString(),
        };
      },
    });
    t.nonNull.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
        description: stringArg(),
        category: arg({ type: "Category" }),
        priority: arg({ type: "Priority" }),
        dueDate: stringArg(),
        startDate: stringArg(),
      },
      async resolve(root, args, context, info) {
        requireRole(["admin", "user"], context.role);
        const {
          id,
          title,
          description,
          category,
          priority,
          dueDate,
          startDate,
        } = args;
        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (priority !== undefined) updateData.priority = priority;
        if (dueDate !== undefined) updateData.dueDate = dueDate;
        if (startDate !== undefined) updateData.startDate = startDate;

        const task = await context.prisma.task.update({
          where: { id },
          data: updateData,
        });
        return {
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          dueDate: task.dueDate.toISOString(),
          startDate: task.startDate.toISOString(),
        };
      },
    });
    t.nonNull.field("deleteTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
        status: arg({ type: "Status" }),
      },
      async resolve(root, args, context, info) {
        requireRole(["admin", "user"], context.role);
        const { id } = args;
        const task = await context.prisma.task.delete({
          where: { id },
        });
        return {
          ...task,
          status: task.status,
          startDate: task.startDate.toISOString(),
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          dueDate: task.dueDate.toISOString(),
        };
      },
    });
    t.nonNull.field("completeTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, context, info) {
        requireRole(["admin", "user"], context.role);
        const { id } = args;
        const task = await context.prisma.task.update({
          where: { id },
          data: { status: "COMPLETED" },
        });
        return {
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          startDate: task.startDate.toISOString(),
          dueDate: task.dueDate.toISOString(),
        };
      },
    });
    t.nonNull.field("inProgressTask", {
      type: "Task",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, context, info) {
        requireRole(["admin", "user"], context.role);
        const { id } = args;
        const task = await context.prisma.task.update({
          where: { id },
          data: { status: "IN_PROGRESS" },
        });
        return {
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          startDate: task.startDate.toISOString(),
          dueDate: task.dueDate.toISOString(),
        };
      },
    });
  },
});
