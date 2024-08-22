export interface CountList {
  [key: string]: number;
}

export default function countBy(arr: (string | number)[]) {
  const total = arr.reduce((acc: CountList, item) => {
    if (acc[item]) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});
  return total;
}
