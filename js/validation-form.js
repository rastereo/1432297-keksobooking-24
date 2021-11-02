const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomNumbers = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const type = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

function onValidata(evt) {
  evt.target.reportValidity();
}

titleInput.addEventListener('input', onValidata);
priceInput.addEventListener('input', onValidata);

const roomValidate = (evt) => {
  const target = evt.target;
  const roomValue = parseInt(roomNumbers.options[roomNumbers.selectedIndex].value, 10);
  const capacityValue = parseInt(capacity.options[capacity.selectedIndex].value, 10);

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

type.addEventListener('change', () => {
  const selectedType = type.options[type.selectedIndex].value;

  priceInput.min = minimalPrice[selectedType];
  priceInput.placeholder = minimalPrice[selectedType];
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
  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  );
});
