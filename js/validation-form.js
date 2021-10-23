const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomNumbers = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

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
