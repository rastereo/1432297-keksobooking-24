const ALERT_SHOW_TIME = 5000;
const LEFT_MOUSE_BUTTON = 0;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccess = () => {
  const blankSuccess = document.querySelector('#success').content;
  const cloneSuccess = blankSuccess.querySelector('.success').cloneNode(true);
  document.body.appendChild(cloneSuccess);

  const closeSuccessClick = (evt) => {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      cloneSuccess.remove();
      document.removeEventListener('click', closeSuccessClick);
    }
  };

  document.addEventListener('click', closeSuccessClick);

  const closeSuccess = (evt) => {
    if (evt.key === 'Escape') {
      cloneSuccess.remove();
      document.removeEventListener('keydown', closeSuccess);
    }
  };

  document.addEventListener('keydown', closeSuccess);
};


const showError = () => {
  const blankError = document.querySelector('#error').content;
  const cloneError = blankError.querySelector('.error').cloneNode(true);
  const errorButton = cloneError.querySelector('.error__button');
  document.body.appendChild(cloneError);

  const closeErrorClick = (evt) => {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      cloneError.remove();
      document.removeEventListener('click', closeErrorClick);
    }
  };

  document.addEventListener('click', closeErrorClick);

  const closeError = (evt) => {
    if (evt.key === 'Escape') {
      cloneError.remove();
      document.removeEventListener('keydown', closeError);
    }
  };

  document.addEventListener('keydown', closeError);

  errorButton.addEventListener('click', () => {
    cloneError.remove();
  });
};

export { showAlert, showSuccess, showError };
