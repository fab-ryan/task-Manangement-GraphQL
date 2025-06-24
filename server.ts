import { startServer } from "./src/index";

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
