import { getRandomIntInclusive } from './random-generator.js';
import { AUTHOR, LOCATION, OFFER } from './data.js';

const PROPERTY_COUNT = 10;

const randomFeatures = () => {
  const containerFeatures = Array.from({});

  for (let i = 0; i <= getRandomIntInclusive(0, OFFER.features.length - 1); i++) {
    const nameRandomFeature = OFFER.features[getRandomIntInclusive(0, OFFER.features.length - 1)];
    if (!containerFeatures.includes(nameRandomFeature)) {
      containerFeatures[i] = nameRandomFeature;
      continue;
    }
    i--;
  }

  return containerFeatures;
};

const randomPhotos = () => {
  const containerPhotos = Array.from({});

  for (let i = 0; i <= getRandomIntInclusive(0, OFFER.photos.length - 1); i++) {
    const nameRandomPhoto = OFFER.photos[getRandomIntInclusive(0, OFFER.photos.length - 1)];
    if (!containerPhotos.includes(nameRandomPhoto)) {
      containerPhotos[i] = nameRandomPhoto;
      continue;
    }
    i--;
  }

  return containerPhotos;
};

// const createCoordinate = function (object) {
//   return {
//   lnt: LOCATION.lat(35.65000, 35.70000, 5),
//   lat: LOCATION.lng(139.70000, 139.80000, 5),
// };

const randomProperty = function () {
  return {
    author: AUTHOR.avatar(getRandomIntInclusive(1, 10)),
    title: OFFER.title,
    adress: {
      lat: LOCATION.lat(35.65000, 35.70000, 5),
      lnt: LOCATION.lng(139.70000, 139.80000, 5),
    },
    price: OFFER.price(10000, 50000),
    type: OFFER.type[getRandomIntInclusive(0, OFFER.type.length - 1)],
    rooms: OFFER.rooms(1, 10),
    guests: OFFER.guests(1, 5),
    checkin: OFFER.checkin[getRandomIntInclusive(0, OFFER.checkin.length - 1)],
    checkout: OFFER.checkout[getRandomIntInclusive(0, OFFER.checkout.length - 1)],
    features: randomFeatures(),
    description: OFFER.description,
    photos: randomPhotos(),
  };
};

const createProperty = Array.from({ length: PROPERTY_COUNT }, randomProperty);

export { createProperty };
