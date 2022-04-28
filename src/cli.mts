// import os
import os from "os";
import logUpdate from "log-update";
import _ from "lodash";

process.openStdin();
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", (text: string) => {
  if (text === "\u0003" || text === "q") {
    process.exit();
  }

  logUpdate(
    _.join(
      _.times(2, () => _.join(_.times(2, () => text))),
      os.EOL
    )
  );
});

logUpdate("∙");
