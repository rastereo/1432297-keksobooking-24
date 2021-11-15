const ANY_FILTERS = 'any';
const RADIX = 10;

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');


const conditions = {
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    max: 10000,
  },
  high: {
    min: 50000,
  },
};

const compareHousingType = (property) => {
  const selectedHousingType = housingType.options[housingType.selectedIndex];
  return selectedHousingType.value === property.offer.type || selectedHousingType.value === ANY_FILTERS;
};

const compareHousingPrice = (property) => {
  const selectedHousingPrice = housingPrice.options[housingPrice.selectedIndex].value;

  if (selectedHousingPrice === ANY_FILTERS) {
    return true;
  }

  const condition = conditions[selectedHousingPrice];
  const price = property.offer.price;
  return (!condition.min || price >= condition.min) && (!condition.max || price <= condition.max);
};

const compareHousingRooms = (property) => {
  const selectedHousingRooms = housingRooms.options[housingRooms.selectedIndex].value;
  return selectedHousingRooms === ANY_FILTERS || parseInt(selectedHousingRooms, RADIX) === property.offer.rooms;
};

const compareHousingGuests = (property) => {
  const selectedHousingGuests = housingGuests.options[housingGuests.selectedIndex].value;
  return selectedHousingGuests === ANY_FILTERS || parseInt(selectedHousingGuests, RADIX) === property.offer.guests;
};


const compareHousingFeatures = (property) => {
  const featureChecked = housingFeatures.querySelectorAll('.map__checkbox:checked');
  const features = property.offer.features || [];

  for (let i = 0; i < featureChecked.length; i++) {
    if (!features.includes(featureChecked[i].value)) {
      return false;
    }
  }

  return true;
};

const filters = {
  type: compareHousingType,
  price: compareHousingPrice,
  rooms: compareHousingRooms,
  guests: compareHousingGuests,
  features: compareHousingFeatures,
};

export { filters };
