import test from "ava";
import appender from "../src/appender.mjs";

test("appends", (t) => {
  const { append } = appender();

  t.deepEqual(append("hello"), "hello");
  t.deepEqual(append(" world!"), "hello world!");
});

test("two appenders", (t) => {
  const { append: a1 } = appender();
  const { append: a2 } = appender();

  t.deepEqual(a1("a1"), "a1");
  t.deepEqual(a2("a2"), "a2");
  t.deepEqual(a1(" hello"), "a1 hello");
  t.deepEqual(a2(" world!"), "a2 world!");
});
