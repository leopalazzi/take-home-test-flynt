import rTracer from "cls-rtracer";
import winston from "winston";

const { combine, timestamp, json, printf, colorize } = winston.format;

const HAS_DEBUG =
  (process.env.NODE_ENV ?? "dev") === "dev" || process.env.TRACE === "1";
const HAS_TEXT_LOG =
  ["dev", "test"].includes(process.env.NODE_ENV as string) ||
  process.env.HAS_TEXT_LOG === "true";

const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const COLORS = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(COLORS);

const addRequestId = winston.format((info) => {
  // eslint-disable-next-line no-param-reassign
  info.reqId = rTracer.id();
  return info;
});

// eslint-disable-next-line @typescript-eslint/no-shadow
const customFormat = printf(
  ({ level, reqId, message, label, job, timestamp, ...rest }) => {
    return [
      timestamp,
      reqId && `[${reqId}]`,
      label && `[${label}]`,
      job && `[${job}]`,
      `${level}:`,
      message && `${message}`,
      Object.keys(rest).length > 0 ? JSON.stringify(rest) : undefined,
    ]
      .filter(Boolean)
      .join(" ");
  }
);

const customJsonFormat = winston.format((info) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
  const { level, reqId, message, label, job, timestamp, ...rest } = info;

  // eslint-disable-next-line no-param-reassign
  info.message = [
    reqId && `[${reqId}]`,
    label && `[${label}]`,
    job && `[${job}]`,
    message && `${message}`,
    Object.keys(rest).length > 0 ? JSON.stringify(rest) : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return info;
});

export const Logger = winston.createLogger({
  level: HAS_DEBUG ? "debug" : "info",
  levels: LEVELS,
  format: combine(
    ...([
      addRequestId(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      HAS_TEXT_LOG && customFormat,
      HAS_TEXT_LOG && colorize({ all: true }),
      !HAS_TEXT_LOG && customJsonFormat(),
      !HAS_TEXT_LOG && colorize({ message: true }),
      !HAS_TEXT_LOG && json(),
    ].filter(Boolean) as winston.Logform.Format[])
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});
