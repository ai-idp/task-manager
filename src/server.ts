import app from "./app.js";
import { createServer } from "http";

const PRIMARY_PORT = Number(process.env.PORT) || 8080;
const FALLBACK_PORT = 3001;
const HOST = "0.0.0.0";

function startServer(port: number, isFallback = false): void {
  const server = createServer(app);

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE" && !isFallback) {
      console.warn(`[task-manager] Port ${port} is in use, trying fallback port ${FALLBACK_PORT}...`);
      startServer(FALLBACK_PORT, true);
    } else {
      console.error(`[task-manager] Failed to start server:`, err.message);
      process.exit(1);
    }
  });

  server.listen(port, HOST, () => {
    console.log(`[task-manager] Server running on http://${HOST}:${port}`);
    console.log(`[task-manager] Health check: http://${HOST}:${port}/health`);
    console.log(`[task-manager] OpenAPI spec: http://${HOST}:${port}/openapi`);
  });
}

startServer(PRIMARY_PORT);
