/**
 * OpenAPI 3.0 Specification
 * Tipo definido inline para evitar dependência externa
 */
export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  servers: Array<{
    url: string;
    description: string;
  }>;
  paths: Record<string, Record<string, unknown>>;
  components: {
    schemas: Record<string, unknown>;
  };
}

export const openApiSpec: OpenApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "task-manager API",
    description: "Permitir o **registro de tarefas** e a **marcação de conclusão** dessas tarefas",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local development server",
    },
  ],
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        description: "Returns the health status of the application",
        operationId: "getHealth",
        tags: ["Health"],
        responses: {
          "200": {
            description: "Application is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "ok",
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time",
                    },
                    uptime: {
                      type: "number",
                      description: "Server uptime in seconds",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/openapi": {
      get: {
        summary: "OpenAPI specification",
        description: "Returns the OpenAPI specification for this API",
        operationId: "getOpenApi",
        tags: ["Documentation"],
        responses: {
          "200": {
            description: "OpenAPI specification",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {},
  },
};
