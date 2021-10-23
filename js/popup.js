function createPopup (property) {
  const blankPopup = document.querySelector('#card').content;
  const mapCanvas = document.querySelector('#map-canvas');
  const clonePopup = blankPopup.cloneNode(true);

  const TypeList = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const titlePopup = clonePopup.querySelector('.popup__title');

  if (property.title) {
    titlePopup.textContent = property.title;
  } else {
    titlePopup.remove();
  }

  const addressPopup = clonePopup.querySelector('.popup__text--address');

  if (property.adress) {
    addressPopup.textContent = property.adress;
  } else {
    addressPopup.remove();
  }

  const pricePopup = clonePopup.querySelector('.popup__text--price');

  if (property.price) {
    pricePopup.textContent = `${property.price} ₽/ночь`;
  } else {
    pricePopup.remove();
  }

  const capacity = clonePopup.querySelector('.popup__text--capacity');

  if (property.rooms && property.guests) {
    capacity.textContent = `${property.rooms} комнаты для ${property.guests} гостей`;
  } else if (property.rooms) {
    capacity.textContent = `${property.rooms} комнаты`;
  } else if (property.guests){
    capacity.textContent = `Для ${property.guests} гостей`;
  } else {
    capacity.remove();
  }

  const timePopup = clonePopup.querySelector('.popup__text--time');

  if (property.checkin && property.checkout) {
    timePopup.textContent = `Заезд после ${property.checkin}, выезд до ${property.checkout}`;
  } else if (property.checkin) {
    timePopup.textContent = `Заезд после ${property.checkin}`;
  } else if (property.checkout) {
    timePopup.textContent = `Выезд до ${property.checkout}`;
  } else {
    timePopup.remove();
  }

  const descriptionPopup = clonePopup.querySelector('.popup__description');

  if (property.description) {
    descriptionPopup.textContent = property.description;
  } else {
    descriptionPopup.remove();
  }

  const avatarPopup = clonePopup.querySelector('.popup__avatar');

  if (property.author){
    avatarPopup.src = property.author;
  } else {
    avatarPopup.remove();
  }

  const typePopup = clonePopup.querySelector('.popup__type');

  if (property.type) {
    typePopup.textContent = TypeList[property.type];
  } else {
    typePopup.remove();
  }

  const featuresPopup = clonePopup.querySelector('.popup__features');
  featuresPopup.innerHTML = '';

  if (property.features) {
    for (let i = 0; i < property.features.length; i++) {
      const featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature');
      featuresListItem.classList.add(`popup__feature--${property.features[i]}`);
      featuresPopup.append(featuresListItem);
    }
  } else {
    featuresPopup.remove();
  }

  const photosPopup = clonePopup.querySelector('.popup__photos');
  photosPopup.innerHTML = '';

  if (property.photos) {
    for (let j = 0; j < property.photos.length; j++) {
      const photosListItem = document.createElement('img');
      photosListItem.classList.add('popup__photo');
      photosListItem.src = property.photos[j];
      photosListItem.width = 45;
      photosListItem.height = 40;
      photosListItem.alt = 'Фотография жилья';
      photosPopup.append(photosListItem);
    }
  } else {
    photosPopup.remove();
  }

  mapCanvas.appendChild(clonePopup);
}

export { createPopup };
