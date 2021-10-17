function switchActiveForm () {
  const form = document.querySelector('.ad-form');
  form.classList.toggle('ad-form--disabled');

  for (let i = 0; i < form.children.length; i++) {
    if (form.children[i].disabled === true) {
      form.children[i].disabled = false;
    } else {
      form.children[i].disabled = true;
    }
  }

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.toggle('ad-form--disabled');

  for (let i = 0; i < mapFilters.children.length; i++) {
    if (mapFilters.children[i].disabled === true) {
      mapFilters.children[i].disabled = false;
    } else {
      mapFilters.children[i].disabled = true;
    }
  }
}

export { switchActiveForm };
