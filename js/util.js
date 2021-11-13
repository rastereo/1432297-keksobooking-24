const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
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

  document.onclick = () => {
    cloneSuccess.remove();
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      cloneSuccess.remove();
    }
  });
};

const showError = () => {
  const blankError = document.querySelector('#error').content;
  const cloneError = blankError.querySelector('.error').cloneNode(true);
  document.body.appendChild(cloneError);

  const errorButton = cloneError.querySelector('.error__button');

  document.onclick = () => {
    cloneError.remove();
  };

  errorButton.onclick = () => {
    cloneError.remove();
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      cloneError.remove();
    }
  });
};

export { showAlert, showSuccess, showError };
