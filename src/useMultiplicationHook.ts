import { useSignal } from "@preact/signals";

export interface Multiplier {
  start: () => Promise<void>;
  push: (pair: MultiplicationPair) => void;
  pushAll: (pairs: MultiplicationPair[]) => void;
}

export interface MultiplicationResult {
  multipliable: Binary;
  multiplier: Binary;
  sum: Binary;
}

export type MultiplierConstructorArgs = {
  doOnResult: (result: MultiplicationResult) => void;
  initialQueue?: QueueItem[];
  timeout?: number;
};

export type ResultDeatailsItem = QueueItem & { operation: string };
export type QueueItem = {
  multipliableDecimal: number;
  multiplierDecimal: number;
  multipliable: Binary;
  multiplier: Binary;
  index: number;
  sum: Binary;
};

export type MultiplicationPair = {
  multipliable: number;
  multiplier: number;
};

export type Binary = (0 | 1)[];

export const useMultiplication = () => {
  const numsVector = useSignal<MultiplicationPair[]>([]);

  const resultDetails = useSignal<(QueueItem & { operation: string })[][]>([]);
  const result = useSignal<QueueItem[]>([]);

  const addPair = (
    { multipliable, multiplier }: { multipliable: number; multiplier: number },
  ) => {
    numsVector.value = [...numsVector.value, { multipliable, multiplier }];
  };

  const clear = () => {
    numsVector.value = [];
    result.value = [];
    resultDetails.value = [];
  };

  const start = () => {
    result.value = pipe(numsVector.value);
  };

  const pipe = (input: MultiplicationPair[]) => {
    resultDetails.value = [
      ...Array(8 * 2 + input.length),
    ].map(() => []);

    const items: QueueItem[] = input.map((i) => ({
      index: 0,
      multipliable: to8bitBinary(i.multipliable),
      multiplier: to8bitBinary(i.multiplier),
      multipliableDecimal: i.multipliable,
      multiplierDecimal: i.multiplier,
      sum: to8bitBinary(0),
    }));

    for (let i = 0; i < 8; i++) {
      let stage = 0;
      // shift
      for (let j = 0; j < items.length; j++) {
        items[j] = shift(items[j]);
        var row = j + 1 + i * 2 + stage;
        resultDetails.value[row].push({ ...items[j], operation: "shift" });
        // console.log('tact [', row, ']  item: ', itemToString(items[j]))
      }

      stage++;
      // add
      for (let j = 0; j < items.length; j++) {
        items[j] = add(items[j]);
        var row = j + 1 + i * 2 + stage;

        resultDetails.value[row].push({ ...items[j], operation: "add" });
        // console.log('tact [', row, ']  item: ', itemToString(items[j]))
      }
    }

    return items;
  };

  return {
    result: result.value,
    resultDetails: resultDetails.value,
    start,
    numsVector: numsVector.value,
    addPair,
    clear,
  };
};

const shift = (item: QueueItem): QueueItem => {
  let { sum } = item;

  return {
    ...item,
    sum: [...sum.slice(1, 8), 0],
  };
};

const add = (item: QueueItem): QueueItem => {
  let {
    index,
    multipliable,
    multiplier,
    multipliableDecimal,
    multiplierDecimal,
    sum,
  } = item;

  if (multiplier[index] === 1) {
    sum = binarySum(sum, multipliable);
  }

  index++;

  return {
    multiplierDecimal,
    multipliableDecimal,
    multipliable,
    multiplier,
    index,
    sum,
  };
};

function binarySum(num1: Binary, num2: Binary): Binary {
  var result = new Array(8);
  var carry = 0;
  for (var i = num1.length - 1; i >= 0; i--) {
    var sym1 = +num1[i];
    var sym2 = +num2[i];
    var sum = +(sym1 ^ sym2 ^ carry);
    result[i] = +sum;
    carry = (sym1 & carry) | (sym2 & carry) | (sym1 & sym2);
  }
  return result;
}

export const to8bitBinary = (num: number) => {
  return [...Array(8)].map((x, i) => num >> i & 1).reverse() as Binary;
};

export const toDecimal = (binaryArray: Binary): number =>
  parseInt(binaryArray.join(""), 2);

export const toStringBinary = (binaryArray: Binary): string =>
  binaryArray.join("");

export const itemToString = (item: QueueItem) => {
  return `[${item.multipliableDecimal}×${item.multiplierDecimal}] multipliable:${
    toStringBinary(item.multipliable)
  }, multiplier:${toStringBinary(item.multiplier)}, sum:${
    toStringBinary(item.sum)
  }`;
};
