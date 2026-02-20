import express, { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import healthRoutes from "./routes/health.js";
import tasksRoutes from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";

const app: Application = express();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Task Manager API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(healthRoutes);
app.use("/tasks", tasksRoutes);

app.use(errorHandler);

export default app;
