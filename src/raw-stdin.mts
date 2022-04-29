export const open = () => {
  process.openStdin();
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
};

export const onChar = (cb: (text: string) => void) =>
  process.stdin.on("data", cb);
