import { $, sleep, os } from "zx";
import test from "ava";
import { promisify } from "util";

test("use stdin.on", async (t) => {
  const { stdout, stdin, exitCode } = $`node ../src/cli.mjs`;

  // TODO extract lastData(stdout)
  const read = () => {
    // TODO - generic type
    let resolve: (value: string) => void;
    let _promise: Promise<string>;

    // TODO - cb as param
    // TODO - call next immediately after resolving
    stdout.on("data", (data) => resolve(String(data).trim()));

    const next = (): Promise<string> =>
      (_promise = new Promise((_resolve) => (resolve = _resolve)));

    const promise = () => _promise;

    return { promise, next };
  };

  const { promise, next } = read();

  t.regex(await next(), /∙/);
  t.regex(await promise(), /∙/);

  next();
  stdin.write("f");
  t.regex(await promise(), /f,f/s);
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
