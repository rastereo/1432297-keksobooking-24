import { postData } from './server-data.js';
import { map, MapDefault, mainPinMarker, showAddressMarker, resetMapForm } from './map.js';
import { showSuccess, showError } from './util.js';
import { resetUpload } from './upload-files.js';

const RADIX = 10;

const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomNumbers = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const type = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const MapMinimalPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MapCapacityRooms = {
  MIN: 0,
  MAX: 100,
};

const onValidata = (evt) => {
  evt.target.reportValidity();
};

titleInput.addEventListener('input', onValidata);
priceInput.addEventListener('input', onValidata);

const roomValidate = (evt) => {
  const target = evt.target;
  const roomValue = parseInt(roomNumbers.options[roomNumbers.selectedIndex].value, RADIX);
  const capacityValue = parseInt(capacity.options[capacity.selectedIndex].value, RADIX);

  let errorMessage = '';

  roomNumbers.setCustomValidity('');
  capacity.setCustomValidity('');

  if (capacityValue > roomValue || capacityValue === MapCapacityRooms.MIN && roomValue !== MapCapacityRooms.MAX || capacityValue !== MapCapacityRooms.MIN && roomValue === MapCapacityRooms.MAX) {
    errorMessage = 'Слишком много гостей для такого количества комнат';
  }

  target.setCustomValidity(errorMessage);
  target.reportValidity();
};

roomNumbers.addEventListener('change', roomValidate);
capacity.addEventListener('change', roomValidate);

const activeMinimalPrice = () => {
  const selectedType = type.options[type.selectedIndex].value;

  priceInput.min = MapMinimalPrice[selectedType];
  priceInput.placeholder = MapMinimalPrice[selectedType];
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

const resetForm = () => {
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

submitButton.addEventListener('click', (evt) => {
  const targetClick = evt.target;
  const formTarget = targetClick.closest('.ad-form');
  formTarget.classList.add('ad-form_invalid');
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const targetSubmit = evt.target;
  targetSubmit.classList.remove('ad-form_invalid');

  postData(
    () => {
      showSuccess();
      resetForm();
      resetMapForm();
      resetUpload();
    },
    () => showError(),
    new FormData(evt.target),
  );
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMapForm();
  resetUpload();
});

export { form, activeMinimalPrice, resetForm };
