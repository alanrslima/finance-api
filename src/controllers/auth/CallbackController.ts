import { Request, Response } from "express";
import url from "url";

export class CallbackController {
  async handle(request: Request, response: Response) {
    response.redirect(
      url.format({
        pathname: "http://localhost:3001/callback",
        query: { token: "1234" },
      })
    );
  }
}
