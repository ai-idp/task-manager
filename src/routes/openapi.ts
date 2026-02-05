import { Router, Request, Response } from "express";
import { openApiSpec } from "../openapi.js";

const router = Router();

/**
 * GET /openapi
 * Returns the OpenAPI specification
 */
router.get("/", (req: Request, res: Response) => {
  res.json(openApiSpec);
});

export default router;
