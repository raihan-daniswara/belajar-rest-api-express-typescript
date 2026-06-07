import pino from "pino";
import pretty from "pino-pretty";

export const logger = pino(
  {
    base: null,
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pretty({
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
  }),
);
