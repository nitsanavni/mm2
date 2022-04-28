import { $ } from "zx";
import test from "ava";

test("cli", async (t) => {
  const { stdout } = await $`node ../src/cli.mjs`;

  t.regex(stdout, /Hello World/);
});

test("sanity", async (t) => {
  const { stdout } = await $`ls`;

  t.regex(stdout, /cli\.test\.ts/s);
});
