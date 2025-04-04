const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export {
  getRandomPositiveInteger,
  getRandomInteger,
  getRandomArrayElement,
  shuffleArray,
};
