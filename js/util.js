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

function showSuccess () {
  const blankSuccess = document.querySelector('#success').content;
  const cloneSuccess = blankSuccess.querySelector('.success').cloneNode(true);
  document.body.appendChild(cloneSuccess);

  document.onclick = function () {
    cloneSuccess.remove();
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      cloneSuccess.remove();
    }
  });
}

function showError () {
  const blankError = document.querySelector('#error').content;
  const cloneError = blankError.querySelector('.error').cloneNode(true);
  document.body.appendChild(cloneError);

  const errorButton = cloneError.querySelector('.error__button');

  document.onclick = function () {
    cloneError.remove();
  };

  errorButton.onclick = function () {
    cloneError.remove();
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      cloneError.remove();
    }
  });
}

export { showAlert, showSuccess, showError };
