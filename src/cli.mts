import logUpdate from "log-update";
import _ from "lodash";

import { open as openStdin, onChar as onStdinChar } from "./raw-stdin.mjs";

openStdin();

const append = (() => {
  let acc = "";

  return (text: string) => {
    acc += text;
    return acc;
  };
})();

onStdinChar((text: string) => {
  if (text === "\u0003" || text === "q") {
    process.exit();
  }

  logUpdate(append(text));
});

logUpdate("");
