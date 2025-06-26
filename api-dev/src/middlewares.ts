import morgan, { StreamOptions } from "morgan";
import { ErrorRequestHandler } from "express";
import { Logger } from "./logger";

export const clientErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (process.env.TRACE) {
    Logger.error("[clientErrorHandler]", { status: 500 });
    Logger.error(err);
    res.status(500).send(err);
  } else if (req.xhr) {
    Logger.error("[clientErrorHandler]", { status: 500 });
    Logger.error(err);
    res.status(500).send({ error: "Internal Error" });
  }
  next(err);
};

export const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  Logger.error("[logErrors]");
  Logger.error(err);
  next(err);
};

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

export const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);
