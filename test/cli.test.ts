import { $, sleep, os } from "zx";
import test from "ava";
import { promisify } from "util";
import { Readable } from "stream";

const lastData = (readable: Readable) =>
  (() => {
    let resolve: (value: string) => void;
    let latestPromise: Promise<string>;

    readable.on("data", (data) => {
      resolve(String(data).trim());
      next();
    });

    const next = (): Promise<string> =>
      (latestPromise = new Promise((_resolve) => (resolve = _resolve)));

    next();

    return () => latestPromise;
  })();

test("use stdin.on", async (t) => {
  const { stdout, stdin, exitCode } = $`node ../src/cli.mjs`;

  const data = lastData(stdout);

  t.regex(await data(), /∙/);

  stdin.write("f");

  t.regex(await data(), /f,f/s);

  stdin.write("h");

  t.regex(await data(), /h,h/s);
});

test("cli", async (t) => {
  const { stdout, stdin, exitCode } = $`node ../src/cli.mjs`;

  const getOut = promisify((cb) =>
    stdout.once("data", (data) => cb(null, String(data).trim()))
  ) as () => Promise<string>;

  const d = await getOut();

  t.deepEqual(d, "∙");

  stdin.write("a");
  t.regex(await getOut(), /a,a\na,a$/s);

  stdin.write("b");
  t.regex(await getOut(), /b,b\nb,b$/s);

  stdin.write("q");

  t.is(await exitCode, 0);
});

test("sanity", async (t) => {
  const { stdout } = await $`ls`;

  t.regex(stdout, /cli\.test\.ts/s);
});
