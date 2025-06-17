import { GraphQLUpload } from "graphql-upload";

declare module "graphql-upload" {
  export interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
  }
}
