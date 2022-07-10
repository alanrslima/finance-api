import "reflect-metadata";
import express from "express";
import { routeResponser } from "./middleware/routeResponser";
import { rolesRouter } from "./routes/v1/roles";
import { permissionsRouter } from "./routes/v1/permissions";
import { usersRouter } from "./routes/v1/users";
import { authRouter } from "./routes/v1/auth";

import "./database";

const app = express();

// Use custom middlewares to responses in routes;
app.use(routeResponser);

app.use(express.json());

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", rolesRouter);
app.use("/api/v1", permissionsRouter);
app.use("/api/v1", usersRouter);

app.listen(3000, () => console.log("Server is running"));
