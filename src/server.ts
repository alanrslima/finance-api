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
import { accountsRouter } from "./routes/v1/accounts";
import { ErrorHandler } from "./lib/ErrorHandler";

const app = express();
const errorHandler = new ErrorHandler();

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
app.use("/api/v1/accounts", accountsRouter);

/**
 * Error handler
 */
app.use(errorHandler.handle);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
