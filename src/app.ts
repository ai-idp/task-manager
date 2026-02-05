import express from "express";
import healthRoutes from "./routes/health.js";
import openapiRoutes from "./routes/openapi.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/health", healthRoutes);
app.use("/openapi", openapiRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
