import millify from "millify";

export const mini = (num) =>
  millify(num, {
    precision: 2,
  });
