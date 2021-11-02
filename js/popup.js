function createPopup (property) {
  const blankPopup = document.querySelector('#card').content;
  const clonePopup = blankPopup.querySelector('.popup').cloneNode(true);

  const TypeList = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const titlePopup = clonePopup.querySelector('.popup__title');

  if (property.offer.title) {
    titlePopup.textContent = property.offer.title;
  } else {
    titlePopup.remove();
  }

  const addressPopup = clonePopup.querySelector('.popup__text--address');

  if (property.offer.address) {
    addressPopup.textContent = property.offer.address;
  } else {
    addressPopup.remove();
  }

  const pricePopup = clonePopup.querySelector('.popup__text--price');

  if (property.offer.price) {
    pricePopup.textContent = `${property.offer.price} ₽/ночь`;
  } else {
    pricePopup.remove();
  }

  const capacity = clonePopup.querySelector('.popup__text--capacity');

  if (property.offer.rooms && property.offer.guests) {
    capacity.textContent = `${property.offer.rooms} комнаты для ${property.offer.guests} гостей`;
  } else if (property.offer.rooms) {
    capacity.textContent = `${property.offer.rooms} комнаты`;
  } else if (property.offer.guests){
    capacity.textContent = `Для ${property.offer.guests} гостей`;
  } else {
    capacity.remove();
  }

  const timePopup = clonePopup.querySelector('.popup__text--time');

  if (property.offer.checkin && property.offer.checkout) {
    timePopup.textContent = `Заезд после ${property.offer.checkin}, выезд до ${property.offer.checkout}`;
  } else if (property.offer.checkin) {
    timePopup.textContent = `Заезд после ${property.offer.checkin}`;
  } else if (property.offer.checkout) {
    timePopup.textContent = `Выезд до ${property.offer.checkout}`;
  } else {
    timePopup.remove();
  }

  const descriptionPopup = clonePopup.querySelector('.popup__description');

  if (property.offer.description) {
    descriptionPopup.textContent = property.offer.description;
  } else {
    descriptionPopup.remove();
  }

  const avatarPopup = clonePopup.querySelector('.popup__avatar');

  if (property.author.avatar){
    avatarPopup.src = property.author.avatar;
  } else {
    avatarPopup.remove();
  }

  const typePopup = clonePopup.querySelector('.popup__type');

  if (property.offer.type) {
    typePopup.textContent = TypeList[property.offer.type];
  } else {
    typePopup.remove();
  }

  const featuresPopup = clonePopup.querySelector('.popup__features');
  featuresPopup.innerHTML = '';

  if (property.offer.features) {
    for (let i = 0; i < property.offer.features.length; i++) {
      const featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature');
      featuresListItem.classList.add(`popup__feature--${property.offer.features[i]}`);
      featuresPopup.append(featuresListItem);
    }
  } else {
    featuresPopup.remove();
  }

  const photosPopup = clonePopup.querySelector('.popup__photos');
  photosPopup.innerHTML = '';

  if (property.offer.photos) {
    for (let i = 0; i < property.offer.photos.length; i++) {
      const photosListItem = document.createElement('img');
      photosListItem.classList.add('popup__photo');
      photosListItem.src = property.offer.photos[i];
      photosListItem.width = 45;
      photosListItem.height = 40;
      photosListItem.alt = 'Фотография жилья';
      photosPopup.append(photosListItem);
    }
  } else {
    photosPopup.remove();
  }

  return clonePopup;
}

export { createPopup };
