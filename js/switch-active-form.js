const turnActiveForm = (object, active) => {
  if (active) {
    object.classList.remove('ad-form--disabled');
  } else {
    object.classList.add('ad-form--disabled');
  }

  for (let i = 0; i < object.children.length; i++) {
    object.children[i].disabled = !active;
  }
};

export { turnActiveForm };
