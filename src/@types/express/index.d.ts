declare namespace Express {
  export interface Request {
    userId: string
  }

  export interface Response {
    responser: (
      status: number,
      message = '',
      data = any,
      error = null,
      type = 'json',
    ) => {}
  }
}
