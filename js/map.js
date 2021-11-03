import { switchActiveForm } from './switch-active-form.js';
import { createPopup } from './popup.js';
import { createLoader } from './server-data.js';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

switchActiveForm(form);
switchActiveForm(mapFilters);

const map = L.map('map-canvas')
  .on('load', () => {
    switchActiveForm(form, true);
    switchActiveForm(mapFilters, true);
  })
  .setView({
    lat: 35.683390,
    lng: 139.749957,
  }, 13);

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
    lat: 35.683390,
    lng: 139.749957,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const addressInput = document.querySelector('#address');

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
});

const pinMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const drawProperty = (object) => {
  object.forEach((property) => {
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
      .addTo(map)
      .bindPopup(createPopup(property));
  });
};

const loader = createLoader(drawProperty, alert);

loader();
