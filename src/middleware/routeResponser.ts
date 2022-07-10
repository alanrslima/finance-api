export const routeResponser = (req, res, next) => {
  res.responser = (
    status,
    msg = "",
    data = {},
    error = null,
    type = "json"
  ) => {
    // if (config.webserver.logs.active) {
    //   const urlsDontLog = ['/health', '/users/me'];

    // let Log = require(`../interfaces/${config.webserver.logs.interface}/classes/log`);
    // Log = new Log(req, status, msg, urlsDontLog);
    // Log.write();
    // }

    if (error) {
      console.error(msg, error);
      console.log("Error details:", error);
    }

    return res.status(status).type(type).send({
      data,
      status,
      msg,
    });
  };

  next();
};
