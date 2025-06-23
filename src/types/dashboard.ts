import { objectType, scalarType } from "nexus";

export const Dashboard = objectType({
  name: "Dashboard",
  definition(t) {
    t.nonNull.int("totalTasks", { description: "Total number of tasks" });
    t.nonNull.int("completedTasks", {
      description: "Number of completed tasks",
    });
    t.nonNull.int("pendingTasks", { description: "Number of pending tasks" });
    t.nonNull.int("inProgressTasks", {
      description: "Number of tasks in progress",
    });
    t.nonNull.int("totalUsers", { description: "Total number of users" });
    t.nonNull.int("activeUsers", { description: "Number of active users" });
    t.nonNull.int("inactiveUsers", { description: "Number of inactive users" });
    t.nonNull.field("tasksByCategory", {
      type: "JSONTypes",
      description: "Tasks grouped by category",
    });
    t.nonNull.field("tasksByPriority", {
      type: "JSONTypes",
      description: "Tasks grouped by priority",
    });
    t.nonNull.int("overallProgress", {
      description: "Overall progress of the tasks",
    });
  },
});

export const JSONType = scalarType({
  name: "JSONTypes",
  description: "JSON type",
  parseValue(value) {
    return JSON.parse(value as string);
  },
});
