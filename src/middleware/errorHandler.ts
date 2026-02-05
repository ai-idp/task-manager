import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
}

/**
 * Global error handler middleware
 */
function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  console.error("[Error]", err.message);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export default errorHandler;
