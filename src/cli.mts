import os from "os";
import logUpdate from "log-update";
import _ from "lodash";

import { intent } from "./intent.mjs";

process.openStdin();
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
process.stdin.resume();
process.stdin.setEncoding("utf8");

const append = (() => {
  let acc = "";

  return (text: string) => {
    acc += text;
    return acc;
  };
})();

process.stdin.on("data", (text: string) => {
  if (text === "\u0003" || text === "q") {
    process.exit();
  }

  logUpdate(append(text));
});

logUpdate("");
