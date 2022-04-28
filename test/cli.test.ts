import { $, sleep } from "zx";
import test from "ava";
import { promisify } from "util";

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
