import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { routeResponser } from "./middleware/routeResponser";
import { rolesRouter } from "./routes/v1/roles";
import { permissionsRouter } from "./routes/v1/permissions";
import { usersRouter } from "./routes/v1/users";
import { authRouter } from "./routes/v1/auth";
// import session from "express-session";
import cors from "cors";
// import passport from "passport";

import { database } from "./database";
import { accountsRouter } from "./routes/v1/accounts";
import { ErrorHandler } from "./lib/ErrorHandler";
import { transactionsRouter } from "./routes/v1/transactions";
import { categoriesRouter } from "./routes/v1/categories";

database.create();

const app = express();

const errorHandler = new ErrorHandler();

// Configure session;
// app.use(
//   session({
//     key: process.env.GITHUB_CLIENT_ID,
//     secret: "]A!m8L?%&G!b=9?6h[", // this can be any name. Its the secret to include in cookie
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// Configure passport ADFS;
// app.use(passport.initialize());
// app.use(passport.session());

// Use custom middlewares to responses in routes;
app.use(routeResponser);
app.use(cors({ origin: "*" }));
app.use(express.json());

/**
 * Routes
 */
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/permissions", permissionsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/accounts", accountsRouter);
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/categories", categoriesRouter);

/**
 * Error handler
 */
app.use(errorHandler.handle);

export default app;
