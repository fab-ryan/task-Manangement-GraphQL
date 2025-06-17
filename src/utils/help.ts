import * as jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../schema/context";
import { UnauthorizedError } from "./unauthorizedError";
const APP_SECRET = process.env.APP_SECRET || "app-secret";

export interface AuthTokenPayload {
  userId: string;
  role: string;
}

export interface AuthRefreshTokenPayload {
  userId: string;
  role: string;
}

export const decodeAuthHeader = (authHeader: string): AuthTokenPayload => {
  try {
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedError("No token found");
    }
    const decoded = jwt.verify(token, APP_SECRET) as AuthTokenPayload;
    return decoded;
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
};

export const requireRole = (
  allowedRoles: string[],
  userRole: string | null
) => {
  if (!userRole) {
    console.log("Unauthorizeds", userRole, allowedRoles);
    throw new UnauthorizedError(
      "You are not authorized to perform this action",
      401
    );
  }
  if (!allowedRoles.includes(userRole.toLowerCase())) {
    throw new UnauthorizedError(
      `Access denied: Requires one of the roles: ${allowedRoles.join(", ")}`,
      403
    );
  }
  return true;
};
export const withRole = (allowedRoles: string[], resolver: Function) => {
  return (
    parent: any,
    args: any,
    context: { userId: string | null },
    info: any
  ) => {
    requireRole(allowedRoles, context.userId);
    return resolver(parent, args, context, info);
  };
};

export const uploadFile = async (
  file: any
): Promise<{
  url: string;
  filename: string;
}> => {
  if (file) {
    const { createReadStream, filename, mimetype, encoding } = await file;
    if (!mimetype.startsWith("image")) {
      throw new Error("File is not an image");
    }
    const uniqueFilename = `${Date.now()}-${filename}`;
    const uploadPath = path.join(__dirname, "..", "..", "uploads");
    const stream = createReadStream();
    await new Promise((resolve, reject) => {
      stream.pipe(fs.createWriteStream(path.join(uploadPath, uniqueFilename)));
      stream.on("end", resolve);
      stream.on("error", reject);
    });
    return {
      url: path.join(uploadPath, uniqueFilename),
      filename: uniqueFilename,
    };
  }
  throw new Error("No file provided");
};
interface UploadServicesRequest extends Request {
  file: any;
  user: {
    userId: string;
  };
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new UnauthorizedError("No token found");
  }
  const decoded = jwt.verify(token, APP_SECRET) as AuthTokenPayload;
  (req as UploadServicesRequest).user = decoded;
  next();
};

export const uploadServices = async (req: Request, res: Response) => {
  try {
    const { url, filename } = await uploadFile(req.file);
    const user = await prisma.user.findUnique({
      where: {
        id: (req as UploadServicesRequest).user.userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await prisma.profile.update({
      where: {
        userId: (req as UploadServicesRequest).user.userId,
      },
      data: {
        profilePictureUrl: url,
      },
    });
    res.status(200).json({
      message: "File uploaded successfully",
      url,
      filename,
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
export { APP_SECRET };
