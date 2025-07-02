import { Client, PageObjectResponse } from "@notionhq/client";
import cron from "node-cron";
import { prisma } from "../schema/context";
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const getDatabase = async (databaseId: string) => {
  const responses = await notion.search({
    filter: {
      property: "object",
      value: "database",
    },
  });
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response;
};

const getPages = async (pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  return response as PageObjectResponse;
};
const getDatabasesId = async () => {
  const databases = [];
  const res = await notion.search({
    filter: {
      property: "object",
      value: "database",
    },
  });
  for (const response of res?.results) {
    databases.push(response?.id);
  }
  return databases;
};

const updateOrCreateTask = async (data: any) => {
  const pointedEmail = process.env.POINTED_EMAIL || "admin@admin.com";
  const userExists = await prisma.user.findUnique({
    where: {
      email: pointedEmail,
    },
  });
  if (!userExists) return;
  const existingTask = await prisma.task.findFirst({
    where: {
      title: data.title,
      user: {
        email: pointedEmail,
      },
    },
  });

  if (existingTask) {
    // Update existing task
    return await prisma.task.update({
      where: { id: existingTask.id },
      data: {
        title: data.title,
        description: data.description || "",
        status: data.status,
        priority: data.priority,
        category: data.category,
        dueDate: data.dueDate ? new Date(data.dueDate) : existingTask.dueDate,
        startDate: data.startDate
          ? new Date(data.startDate)
          : existingTask.startDate,
        updatedAt: new Date(),
      },
    });
  }

  const newTask = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description || "",
      status: data.status,
      priority: data.priority,
      category: data.category,
      dueDate: data.dueDate,
      startDate: data.startDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          email: pointedEmail,
        },
      },
    },
  });
  return newTask;
};

interface PageProperties {
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  dueDate: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
}

cron.schedule("*/50 * * * * *", async () => {
  const databases = await getDatabasesId();
  for (const database of databases) {
    const databaseResponse = await getDatabase(database as string);
    const pages = databaseResponse?.results;
    for (const page of pages) {
      const pageResponse = await getPages(page?.id as string);
      const pageProperties = pageResponse?.properties;
      const data = {
        title: pageProperties?.["Task name"]
          ? pageProperties?.["Task name"]?.type === "title"
            ? pageProperties?.["Task name"]?.title[0]?.plain_text
            : ""
          : "",
        description:
          pageProperties?.["Description"]?.type === "rich_text"
            ? pageProperties?.["Description"]?.rich_text[0]?.plain_text
            : "",
        status:
          // @ts-ignore
          pageProperties?.Status?.status?.name === "In progress"
            ? "IN_PROGRESS"
            : // @ts-ignore
            pageProperties?.Status?.status?.name === "Done"
            ? "COMPLETED"
            : "PENDING",
        priority:
          pageProperties?.Priority?.type === "select"
            ? pageProperties?.Priority?.select?.name.toUpperCase()
            : "",
        category:
          pageProperties?.["Select Type"]?.type === "select"
            ? pageProperties?.["Select Type"]?.select?.name.toUpperCase()
            : "",
        dueDate:
          pageProperties?.["Due date"]?.type === "date"
            ? new Date(
                pageProperties?.["Due date"]?.date?.start as string
              ).toISOString()
            : "",
        startDate:
          pageProperties?.["Start Date"]?.type === "date"
            ? new Date(
                pageProperties?.["Start Date"]?.date?.start as string
              ).toISOString()
            : "",
        createdAt: pageResponse?.created_time,
        updatedAt: pageResponse?.last_edited_time,
      };
      await updateOrCreateTask(data);
      console.log(
        `Task "${
          data.title
        }" processed successfully at ${new Date().toISOString()}`
      );
    }
  }
});

/**
 * Notion utility functions for interacting with Notion API.
 * This includes fetching databases, pages, and updating tasks in the database.
 */

export default notion;
