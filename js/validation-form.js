import { postData } from './server-data.js';
import { map, MapDefault, mainPinMarker, showAddressMarker } from './map.js';

const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomNumbers = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const type = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const RADIX = 10;

function onValidata(evt) {
  evt.target.reportValidity();
}

titleInput.addEventListener('input', onValidata);
priceInput.addEventListener('input', onValidata);

const roomValidate = (evt) => {
  const target = evt.target;
  const roomValue = parseInt(roomNumbers.options[roomNumbers.selectedIndex].value, RADIX);
  const capacityValue = parseInt(capacity.options[capacity.selectedIndex].value, RADIX);

  let errorMessage = '';

  roomNumbers.setCustomValidity('');
  capacity.setCustomValidity('');

  if (capacityValue > roomValue || capacityValue === 0 && roomValue !== 100 || capacityValue !== 0 && roomValue === 100) {
    errorMessage = 'Слишком много гостей для такого количества комнат';
  }

  target.setCustomValidity(errorMessage);
  target.reportValidity();
};

roomNumbers.addEventListener('change', roomValidate);
capacity.addEventListener('change', roomValidate);

const minimalPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const activeMinimalPrice = function () {
  const selectedType = type.options[type.selectedIndex].value;

  priceInput.min = minimalPrice[selectedType];
  priceInput.placeholder = minimalPrice[selectedType];
};

type.addEventListener('change', () => {
  activeMinimalPrice();
});

timeIn.addEventListener('change', () => {
  const findTimeOut = [].findIndex.call(timeOut.options, (option) => option.value === timeIn.options[timeIn.selectedIndex].value);

  if (findTimeOut < 0) {
    throw new Error('Время не найдено');
  }
  timeOut.selectedIndex = findTimeOut;
});

timeOut.addEventListener('change', () => {
  const findTimeIn = [].findIndex.call(timeIn.options, (option) => option.value === timeOut.options[timeOut.selectedIndex].value);

  if (findTimeIn < 0) {
    throw new Error('Время не найдено');
  }
  timeIn.selectedIndex = findTimeIn;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postData(new FormData(evt.target));
});

const resetForm = function () {
  form.reset();
  map.closePopup();
  activeMinimalPrice();

  mainPinMarker.setLatLng({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  });
  map.setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  }, MapDefault.ZOOM);

  showAddressMarker();
};

const resetButton = form.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export { form, activeMinimalPrice, resetForm };
