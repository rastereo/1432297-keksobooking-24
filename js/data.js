import { getRandomFloat, getRandomIntInclusive } from './random-generator';

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

export {AUTHOR, LOCATION, OFFER};
