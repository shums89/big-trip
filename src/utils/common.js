const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export {
  getRandomPositiveInteger,
  getRandomArrayElement,
  shuffleArray,
};
