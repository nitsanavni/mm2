import { $, sleep } from "zx";
import test from "ava";
import { promisify } from "util";
import { Readable } from "stream";

const lastData = (readable: Readable) =>
  (() => {
    let resolve: (value: string) => void;
    let latestPromise: Promise<string>;
    let latest: string;

    readable.on("data", (data) => {
      latest = data.toString().trim();
      resolve(latest);
      next();
    });

    const next = (): Promise<string> =>
      (latestPromise = new Promise((_resolve) => (resolve = _resolve)));

    next();

    return (opts?: { timeout?: number }) => {
      const { timeout } = { timeout: 200, ...opts };

      return Promise.race([latestPromise, sleep(timeout).then(() => latest)]);
    };
  })();

test("starts with input mode", async (t) => {
  const { stdout, stdin, exitCode } = $`node ../src/cli.mjs`;

  const data = lastData(stdout);

  t.deepEqual(await data({ timeout: 1000 }), "");

  stdin.write("hello");

  t.regex(await data(), /hello$/s);

  stdin.write(" world!");

  t.regex(await data(), /hello world!$/s);
});
