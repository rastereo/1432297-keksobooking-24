import { createProperty } from './create-property.js';

const blankPopup = document.querySelector('#card').content;
const mapCanvas = document.querySelector('#map-canvas');
const clonePopup = blankPopup.cloneNode(true);

const typeList = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

if (createProperty[0].title) {
  clonePopup.querySelector('.popup__title').textContent = createProperty[0].title;
} else {
  clonePopup.querySelector('.popup__title').remove();
}

if (createProperty[0].adress) {
  clonePopup.querySelector('.popup__text--address').textContent = createProperty[0].adress;
} else {
  clonePopup.querySelector('.popup__text--address').remove();
}

if (createProperty[0].price) {
  clonePopup.querySelector('.popup__text--price').textContent = `${createProperty[0].price} ₽/ночь`;
} else {
  clonePopup.querySelector('.popup__text--price').remove();
}

if (createProperty[0].rooms) {
  clonePopup.querySelector('.popup__text--capacity').textContent = `${createProperty[0].rooms} комнаты`;
} else {
  clonePopup.querySelector('.popup__text--capacity').textContent = `Для ${createProperty[0].guests} гостей`;
}
if (createProperty[0].rooms && createProperty[0].guests) {
  clonePopup.querySelector('.popup__text--capacity').textContent = `${createProperty[0].rooms} комнаты для ${createProperty[0].guests} гостей`;
}
if (!createProperty[0].rooms && !createProperty[0].guests) {
  clonePopup.querySelector('.popup__text--capacity').remove();
}

if (createProperty[0].checkin) {
  clonePopup.querySelector('.popup__text--time').textContent = `Заезд после ${createProperty[0].checkin}`;
}
if (createProperty[0].checkout) {
  clonePopup.querySelector('.popup__text--time').textContent = `Выезд до ${createProperty[0].checkout}`;
}
if (createProperty[0].checkin && createProperty[0].checkout) {
  clonePopup.querySelector('.popup__text--time').textContent = `Заезд после ${createProperty[0].checkin}, выезд до ${createProperty[0].checkout}`;
}
if (!createProperty[0].checkin && !createProperty[0].checkout) {
  clonePopup.querySelector('.popup__text--time').remove();
}

if (createProperty[0].description) {
  clonePopup.querySelector('.popup__description').textContent = createProperty[0].description;
} else {
  clonePopup.querySelector('.popup__description').remove();
}

if (createProperty[0].author){
  clonePopup.querySelector('.popup__avatar').src = createProperty[0].author;
} else {
  clonePopup.querySelector('.popup__avatar').remove();
}

if (createProperty[0].type) {
  clonePopup.querySelector('.popup__type').textContent = typeList[createProperty[0].type];
} else {
  clonePopup.querySelector('.popup__type').remove();
}

const featuresPopup = clonePopup.querySelector('.popup__features');
featuresPopup.innerHTML = '';

if (createProperty[0].features) {
  for (let i = 0; i < createProperty[0].features.length; i++) {
    const featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add(`popup__feature--${createProperty[0].features[i]}`);
    featuresPopup.append(featuresListItem);
  }
} else {
  featuresPopup.remove();
}

const photosPopup = clonePopup.querySelector('.popup__photos');
photosPopup.innerHTML = '';

if (createProperty[0].photos) {
  for (let j = 0; j < createProperty[0].photos.length; j++) {
    const photosListItem = document.createElement('img');
    photosListItem.classList.add('popup__photo');
    photosListItem.src = createProperty[0].photos[j];
    photosListItem.width = 45;
    photosListItem.height = 40;
    photosListItem.alt = 'Фотография жилья';
    photosPopup.append(photosListItem);
  }
} else {
  photosPopup.remove();
}

mapCanvas.appendChild(clonePopup);
