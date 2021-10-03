// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    throw 'Отрицательное число!';
  }
  if (max < min) {
    throw 'Max меньше min!';
  }
  if (max === min) {
    throw 'Max равен min!';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomFloat(min, max, maxDigits) {
  if (min < 0 || max < 0) {
    throw 'Отрицательное число!';
  }
  if (max < min) {
    throw 'Max меньше min!';
  }
  if (max === min) {
    throw 'Max равен min!';
  }

  const digitsDegree = 10 ** maxDigits;
  const result = ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;

  return result;
}

// console.log('Cлучайное целое число: ' + getRandomIntInclusive(0, 100))
// console.log('Cлучайное число с плавающей точкой: ' + getRandomFloat(1.1, 1.2, 4))

// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Источник "Количество знаков после запятой" https://qna.habr.com/q/999157


const AUTHOR = {
  avatar: (number) => {
    if (number < 10) {
      number = `0${number}`;
    }
    return `img/avatars/user${number}.png`;
  },
};

const LOCATION = {
  lat: (from, to, maxDigits) => getRandomFloat(from, to, maxDigits),
  lng: (from, to, maxDigits) => getRandomFloat(from, to, maxDigits),
};

const OFFER = {
  tittle: 'Сдам жилплощадь в Токио',
  adress: `${LOCATION.lat}, ${LOCATION.lng}`,
  price: (from, to) => getRandomIntInclusive(from, to),
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  rooms: (from, to) => getRandomIntInclusive(from, to),
  guests: (from, to) => getRandomIntInclusive(from, to),
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: 'Хороший район с развитой инфраструктурой, рядом магазины, ТЦ, недалеко озеро. Звоните уважаемые клиенты!',
  photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
};

const PROPERTY_COUNT = 10;

const randomFeatures = () => {
  const containerFeatures = Array.from({});

  for (let i = 0; i <= getRandomIntInclusive(0, OFFER.features.length - 1); i++) {
    const nameRandomFeature = OFFER.features[getRandomIntInclusive(0, OFFER.features.length - 1)];
    if (!containerFeatures.includes(nameRandomFeature)) {
      containerFeatures[i] = nameRandomFeature;
    }
  }

  return containerFeatures;
};

const randomPhotos = () => {
  const containerPhotos = Array.from({});

  for (let i = 0; i <= getRandomIntInclusive(0, OFFER.photos.length - 1); i++) {
    const nameRandomPhoto = OFFER.photos[getRandomIntInclusive(0, OFFER.photos.length - 1)];
    if (!containerPhotos.includes(nameRandomPhoto)) {
      containerPhotos[i] = nameRandomPhoto;
    }
  }

  return containerPhotos;
};

const randomProperty = function () {
  return {
    author: AUTHOR.avatar(getRandomIntInclusive(1, 10)),
    tittle: OFFER.tittle,
    adress: `${LOCATION.lat(35.65000, 35.70000, 5)}, ${LOCATION.lng(139.70000, 139.80000, 5)}`,
    price: OFFER.price(10000, 50000),
    type: OFFER.type[getRandomIntInclusive(0, OFFER.type.length - 1)],
    rooms: OFFER.rooms(1, 10),
    guests: OFFER.guests(1, 5),
    checkin: OFFER.checkin[getRandomIntInclusive(0, OFFER.checkin.length - 1)],
    checkout: OFFER.checkout[getRandomIntInclusive(0, OFFER.checkout.length - 1)],
    features: randomFeatures(), // не могу понять, откуда в массиве появляются пустые элементы
    description: OFFER.description,
    photos: randomPhotos(), // не могу понять, откуда в массиве появляются пустые элементы
  };
};

const createProperty = Array.from({ length: PROPERTY_COUNT }, randomProperty);
