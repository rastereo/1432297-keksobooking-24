import './data.js';
import './random-generator.js';
import { createProperty } from './create-property.js';
import { createPopup } from './popup.js';
import { switchActiveForm } from './switch-active-form.js';
import './validation-form.js';

createPopup(createProperty[0]);

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
switchActiveForm(form, true);
switchActiveForm(mapFilters);
