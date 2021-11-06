import { switchActiveForm } from './switch-active-form.js';
import { createPopup } from './popup.js';
import { getData } from './server-data.js';
import { showAlert } from './util.js';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const MapDefault = {
  LAT: 35.683390,
  LNG: 139.749957,
  ZOOM: 13,
};

switchActiveForm(form);
switchActiveForm(mapFilters);

const map = L.map('map-canvas')
  .on('load', () => {
    switchActiveForm(form, true);
    switchActiveForm(mapFilters, true);
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

const showAddressMarker = function () {
  const addressInput = document.querySelector('#address');
  addressInput.value = `${mainPinMarker._latlng.lat}, ${mainPinMarker._latlng.lng}`;

  mainPinMarker.on('moveend', (evt) => {
    addressInput.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
  });
};

showAddressMarker();

const pinMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const drawProperty = (data) => {
  data.forEach((property) => {
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

const loaderMarker = getData(drawProperty, showAlert);

loaderMarker();

export { map, mainPinMarker, MapDefault, showAddressMarker };
