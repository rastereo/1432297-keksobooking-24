const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomNumbers = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

titleInput.addEventListener('input', () => {
  const valueTitle = titleInput.value.length;

  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else if (valueTitle < 30) {
    titleInput.setCustomValidity(`Ещё ${30 - valueTitle} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;

  if (priceValue > 1000000) {
    priceInput.setCustomValidity('Максимальное значение — 1 000 000');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});


const validateRoomsAndCapacity = function () {
  for (let j = 0; j < capacity.children.length; j++) {
    capacity.children[j].selected = false;
    capacity.children[j].disabled = true;
  }

  for (let i = 0; i < roomNumbers.children.length; i++) {
    if (roomNumbers.children[i].selected) {
      if (roomNumbers.children[i].value === '1') {
        capacity.children[2].selected = true;
        capacity.children[2].disabled = false;
      }
      if (roomNumbers.children[i].value === '2') {
        capacity.children[1].selected = true;
        capacity.children[1].disabled = false;
        capacity.children[2].disabled = false;
      }
      if (roomNumbers.children[i].value === '3') {
        capacity.children[0].selected = true;
        capacity.children[0].disabled = false;
        capacity.children[1].disabled = false;
        capacity.children[2].disabled = false;
      }
      if (roomNumbers.children[i].value === '100') {
        capacity.children[3].selected = true;
        capacity.children[3].disabled = false;
      }
    }
  }
};

validateRoomsAndCapacity();

roomNumbers.addEventListener('change', () => {
  validateRoomsAndCapacity();
});
