import { showSuccess, showError } from './util.js';
import { resetForm } from './validation-form.js';

const getData = (onSuccess, onError) => () =>
  fetch(
    'https://24.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });

const postData = (body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        resetForm();
        showSuccess();

      } else {
        showError();
      }
    })
    .catch(() => {
      showError();
    });
};

export { getData, postData };
