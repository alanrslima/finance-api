// import { Router } from "express";
// const router = Router();

// const HealthClass = require(`../domain/health`);
// let Health = new HealthClass();

// //Routes;
// router.get("/", async (req, res, next) => {
//   try {
//     const [databaseConnection, internetConnection] =
//       await Health.testConnections();

//     const response = {
//       environmentConfig: process.env.NODE_ENV,
//       internetConnection,
//       databaseConnection,
//     };

//     return res.response(
//       200,
//       `SERVER WORKING WITH ALL CONFIGURATION.`,
//       response
//     );
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

import { Router } from "express";
import { GetHealthController } from "../controllers/health/GetHealthController";

const router = Router();

router.get("/roles/:roleId", new GetHealthController().handle);

export { router };
