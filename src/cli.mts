import logUpdate from "log-update";
import _ from "lodash";

import { open as openStdin, onChar as onStdinChar } from "./raw-stdin.mjs";
import appender from "./appender.mjs";

openStdin();

const { append } = appender();

onStdinChar((text: string) => {
  if (text === "\u0003" || text === "q") {
    process.exit();
  }

  logUpdate(append(text));
});

logUpdate("");
