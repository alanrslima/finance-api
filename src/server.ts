import "express-async-errors";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { routeResponser } from "./middleware/routeResponser";
import { rolesRouter } from "./routes/v1/roles";
import { permissionsRouter } from "./routes/v1/permissions";
import { usersRouter } from "./routes/v1/users";
import { authRouter } from "./routes/v1/auth";

import "./database";
import { productsRouter } from "./routes/v1/products";

const app = express();

// Use custom middlewares to responses in routes;
app.use(routeResponser);

app.use(express.json());

/**
 * Routes
 */
app.use("/api/v1", authRouter);
app.use("/api/v1", rolesRouter);
app.use("/api/v1", permissionsRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1", productsRouter);

/**
 * Error handler
 */
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.responser(400, error.message);

    // TODO: Improve error handler
    switch (error.name) {
      case "UrlNotFound":
      case "InvalidBody":
        return response.responser(400, error.message);
      default:
        return response.responser(
          500,
          "Ops ocorreu um erro, tente novamente mais tarde."
        );
    }
  }
);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
