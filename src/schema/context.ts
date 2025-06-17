import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { decodeAuthHeader, AuthTokenPayload } from "../utils";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
  role: string | null;
}

export const context = ({ req }: { req: Request }): Context => {
  const token = req.headers.authorization;
  const decoded = token ? decodeAuthHeader(token) : null;
  const userId = decoded?.userId || null;
  const role = decoded?.role || null;
  return { prisma, userId, role };
};
