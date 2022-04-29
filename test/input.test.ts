import test from "ava";
import input from "../src/input.mjs";

test("appends", (t) => {
  const { append } = input();

  t.deepEqual(append("1"), "1");
  t.deepEqual(append("2"), "12");
});
