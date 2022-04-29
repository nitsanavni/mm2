import appender from "./appender.mjs";

export const input = () => {
  const { append } = appender();

  return { append, value: () => append("") };
};

export default input;
