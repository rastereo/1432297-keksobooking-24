import { turnActiveForm } from './switch-active-form.js';
import { createPopup } from './popup.js';
import { getData } from './server-data.js';
import { showAlert } from './util.js';
import { debounce } from './utils/debounce.js';
import { filters } from './filter.js';

const SIMILAR_PROPERTY_COUNT = 10;
const ANY_FILTERS = 'any';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const housingFeatures = mapFilters.querySelector('#housing-features');

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

const markerGroup = L
  .layerGroup()
  .addTo(map);

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
  const mapFilterSelects = mapFilters.querySelectorAll('.map__filter');

  for (let i = 0; i < mapFilterSelects.length; i++) {
    mapFilterSelects[i].selectedIndex = ANY_FILTERS;
  }

  for (let i = 0; i < featureCheckedsReset.length; i++) {
    featureCheckedsReset[i].checked = false;
  }

  getData(showData, showAlert);
};

getData(showData, showAlert);

export { map, mainPinMarker, MapDefault, showAddressMarker, resetMapForm };
