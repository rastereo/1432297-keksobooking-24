import { createProperty } from './create-property.js';

const blankPopup = document.querySelector('#card').content;
const mapCanvas = document.querySelector('#map-canvas');

const typeList = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const clonePopup = blankPopup.cloneNode(true);

clonePopup.querySelector('.popup__title').textContent = createProperty[0].title;
clonePopup.querySelector('.popup__text--address').textContent = createProperty[0].adress;
clonePopup.querySelector('.popup__text--price').textContent = `${createProperty[0].price} ₽/ночь`;
clonePopup.querySelector('.popup__text--capacity').textContent = `${createProperty[0].rooms} комнаты для ${createProperty[0].guests} гостей`;
clonePopup.querySelector('.popup__text--time').textContent = `Заезд после ${createProperty[0].checkin}, выезд до ${createProperty[0].checkout}`;
clonePopup.querySelector('.popup__description').textContent = createProperty[0].description;
clonePopup.querySelector('.popup__avatar').src = createProperty[0].author;
clonePopup.querySelector('.popup__type').textContent = typeList[createProperty[0].type];

const featuresPopup = clonePopup.querySelector('.popup__features');
featuresPopup.innerHTML = '';

for (let i = 0; i < createProperty[0].features.length; i++) {
  const featuresListItem = document.createElement('li');
  featuresListItem.classList.add('popup__feature');
  featuresListItem.classList.add(`popup__feature--${createProperty[0].features[i]}`);
  featuresPopup.append(featuresListItem);
}

const photosPopup = clonePopup.querySelector('.popup__photos');
photosPopup.innerHTML = '';

for (let j = 0; j < createProperty[0].photos.length; j++) {
  const photosListItem = document.createElement('img');
  photosListItem.classList.add('popup__photo');
  photosListItem.src = createProperty[0].photos[j];
  photosListItem.width = 45;
  photosListItem.height = 40;
  photosListItem.alt = 'Фотография жилья';
  photosPopup.append(photosListItem);
}

// const newPopup = clonePopup.querySelector('.popup');

// for (let i = 0; i < newPopup.children.length; i++) {
//   if (newPopup.children[i].textContent) {
//     console.log(newPopup.children[i]);
//   }
// };

// console.log(newPopup);
// console.log(newPopup.children);

mapCanvas.appendChild(clonePopup);
