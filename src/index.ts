import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema";
import { context } from "./schema/context";
import { Request } from "express";
import express from "express";
import { authMiddleware, uploadServices } from "./utils/help";
import multer from "multer";
import cors from "cors";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

app.use(cors());

app.post("/upload", authMiddleware, upload.single("file"), uploadServices);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

const server = new ApolloServer({
  schema,
});

const port = process.env.PORT || 4000;

export async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => context({ req: req as Request }),
    })
  );

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}
