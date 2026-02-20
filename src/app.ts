import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import healthRoutes from "./routes/health.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "task-manager API",
      version: "1.0.0",
      description: "Permitir o **registro de tarefas** e a **marcação de conclusão** dessas tarefas",
    },
  },
  apis: ["./src/**/*.ts", "./dist/**/*.js"],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (_req, res) => res.json(swaggerSpec));

app.use(healthRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
