import { objectType, enumType, inputObjectType, scalarType } from "nexus";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.id("id", { description: "The id of the task" });
    t.nonNull.string("title", { description: "The title of the task" });
    t.nonNull.string("description", {
      description: "The description of the task",
    });
    t.nonNull.field("status", {
      type: "Status",
      description: "The status of the task",
    });
    t.nonNull.string("category", {
      description: "The category of the task",
    });
    t.nonNull.field("priority", {
      type: "Priority",
      description: "The priority of the task",
    });
    t.nonNull.string("dueDate", { description: "The due date of the task" });
    t.nonNull.string("startDate", {
      description: "The start date of the task",
    });
    t.nonNull.string("createdAt", {
      description: "The date and time the task was created",
    });
    t.nonNull.string("updatedAt", {
      description: "The date and time the task was updated",
    });
  },
});
export const Category = enumType({
  name: "Category",
  members: ["WORK", "PERSONAL", "SHOPPING", "OTHER"],
});
export const Status = enumType({
  name: "Status",
  members: ["PENDING", "COMPLETED", "IN_PROGRESS"],
});
export const Priority = enumType({
  name: "Priority",
  members: ["LOW", "MEDIUM", "HIGH"],
});

export const TaskFilter = inputObjectType({
  name: "TaskFilter",
  definition(t) {
    t.string("title");
    t.string("description");
    t.field("status", {
      type: "Status",
    });
    t.string("category");
    t.field("priority", {
      type: "Priority",
    });
    t.field("dueDate", {
      type: "DateTime",
    });
  },
});
export const DateTime = scalarType({
  name: "DateTime",
  asNexusMethod: "date",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : value;
  },
});
export const TaskSort = inputObjectType({
  name: "TaskSort",
  definition(t) {
    t.field("createdAt", {
      type: "SortOrder",
    });
    t.field("updatedAt", {
      type: "SortOrder",
    });
    t.field("dueDate", {
      type: "SortOrder",
    });
  },
});
export const SortOrder = enumType({
  name: "SortOrder",
  members: ["asc", "desc"],
});
