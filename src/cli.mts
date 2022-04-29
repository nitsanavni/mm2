import logUpdate from "log-update";
import _ from "lodash";

import { open as openStdin, onChar as onStdinChar } from "./raw-stdin.mjs";
import input from "./input.mjs";

openStdin();

const { append: appendToInput, value: renderInput } = input();

onStdinChar((text: string) => {
  if (text === "\u0003") {
    process.exit();
  }

  appendToInput(text);

  logUpdate(renderInput());
});

logUpdate("");
