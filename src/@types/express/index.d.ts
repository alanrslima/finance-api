declare namespace Express {
  export interface Request {
    userId: string;
  }

  export interface Response {
    responser: () => {};
  }
}
