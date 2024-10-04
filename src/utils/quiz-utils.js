export const shuffleArray = array => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = makeRandomIndex(arr);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const makeRandomIndex = arr => {
  return Math.floor(Math.random() * arr.length);
};

export const generateIndexes = (data, count, exclude = []) => {
  const indexes = new Set();
  while (indexes.size < count) {
    const index = makeRandomIndex(data);
    if (exclude.includes(index)) continue;
    indexes.add(index);
  }
  return Array.from(indexes);
};
