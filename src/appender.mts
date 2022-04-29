export const appender = () => {
  let acc = "";

  return {
    append: (text: string) => (acc += text),
  };
};

export default appender;
