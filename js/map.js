import { turnActiveForm } from './switch-active-form.js';
import { createPopup } from './popup.js';
import { getData } from './server-data.js';
import { showAlert } from './util.js';
import { debounce } from './utils/debounce.js';

const SIMILAR_PROPERTY_COUNT = 10;
const ANY_FILTERS = 'any';
const RADIX = 10;

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

const MapHousingPrice = {
  LOW: 10000,
  HIGH: 50000,
};

const MapDefault = {
  LAT: 35.683390,
  LNG: 139.749957,
  ZOOM: 13,
};

turnActiveForm(form);
turnActiveForm(mapFilters);

const map = L.map('map-canvas')
  .on('load', () => {
    turnActiveForm(form, true);
  })
  .setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  }, MapDefault.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const showAddressMarker = () => {
  const addressInput = document.querySelector('#address');
  addressInput.value = `${mainPinMarker._latlng.lat}, ${mainPinMarker._latlng.lng}`;

  mainPinMarker.on('moveend', (evt) => {
    addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

showAddressMarker();

const pinMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const compareHousingType = (property) => {
  const selectedHousingType = housingType.options[housingType.selectedIndex];
  if (selectedHousingType.value === property.offer.type || selectedHousingType.value === ANY_FILTERS) {
    return true;
  }

  return false;
};

const compareHousingPrice = (property) => {
  const selectedHousingPrice = housingPrice.options[housingPrice.selectedIndex].value;

  if (selectedHousingPrice === 'middle' && property.offer.price >= MapHousingPrice.LOW && property.offer.price <= MapHousingPrice.HIGH) {
    return true;
  }

  if (selectedHousingPrice === 'low' && property.offer.price < MapHousingPrice.LOW) {
    return true;
  }

  if (selectedHousingPrice === 'high' && property.offer.price > MapHousingPrice.HIGH) {
    return true;
  }

  if (selectedHousingPrice === ANY_FILTERS) {
    return true;
  }

  return false;
};

const compareHousingRooms = (property) => {
  const selectedHousingRooms = housingRooms.options[housingRooms.selectedIndex].value;

  if (selectedHousingRooms === ANY_FILTERS || parseInt(selectedHousingRooms, RADIX) === property.offer.rooms) {
    return true;
  }

  return false;
};

const compareHousingGuests = (property) => {
  const selectedHousingGuests = housingGuests.options[housingGuests.selectedIndex].value;

  if (selectedHousingGuests === ANY_FILTERS || parseInt(selectedHousingGuests, RADIX) === property.offer.guests) {
    return true;
  }

  return false;
};


const compareHousingFeaturies = (property) => {
  const featureCheckeds = housingFeatures.querySelectorAll('.map__checkbox:checked');
  const features = property.offer.features || [];

  for (let i = 0; i < featureCheckeds.length; i++) {
    if (!features.includes(featureCheckeds[i].value)) {
      return false;
    }
  }

  return true;
};

const markerGroup = L
  .layerGroup()
  .addTo(map);

const filters = {
  type: compareHousingType,
  price: compareHousingPrice,
  rooms: compareHousingRooms,
  guests: compareHousingGuests,
  featuries: compareHousingFeaturies,
};

const drawProperty = (data) => {
  data
    .slice()
    .filter((property) => {
      for (const keys in filters) {
        if (!filters[keys](property)) {
          return false;
        }
      }
      return true;
    })
    .slice(0, SIMILAR_PROPERTY_COUNT)
    .forEach((property) => {
      const pinMarker = L.marker(
        {
          lat: property.location.lat,
          lng: property.location.lng,
        },
        {
          icon: pinMarkerIcon,
        },
      );

      pinMarker
        .addTo(markerGroup)
        .bindPopup(createPopup(property));
    });

  if (data) {
    turnActiveForm(mapFilters, true);
  }
};


const showData = (data) => {
  drawProperty(data);

  mapFilters.addEventListener('change', () => {
    markerGroup.clearLayers();
    map.closePopup();
    getData(debounce(showData), showAlert);
  });
};

const resetMapForm = () => {
  const featureCheckedsReset = housingFeatures.querySelectorAll('.map__checkbox:checked');

  housingType.selectedIndex = ANY_FILTERS;
  housingPrice.selectedIndex = ANY_FILTERS;
  housingRooms.selectedIndex = ANY_FILTERS;
  housingGuests.selectedIndex = ANY_FILTERS;

  for (let i = 0; i < featureCheckedsReset.length; i++) {
    featureCheckedsReset[i].checked = false;
  }

  getData(showData, showAlert);
};

getData(showData, showAlert);

export { map, mainPinMarker, MapDefault, showAddressMarker, resetMapForm };
