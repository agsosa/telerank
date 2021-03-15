import log4js from "log4js";

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%d %p %c %f:%l %m%n",
      },
    },
  },
  categories: {
    default: { appenders: ["out"], level: "info", enableCallStack: true },
  },
});

export const log = log4js.getLogger();

// "flavio" -> "Flavio"
export function capitalizeStr(str?: string): string | undefined {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  return undefined;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
