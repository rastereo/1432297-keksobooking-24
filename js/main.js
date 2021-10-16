import './data.js';
import './random-generator.js';
import { createProperty } from './create-property.js';
import { createPopup } from './popup.js';
import { switchActiveForm } from './switch-active-form.js';

createPopup(createProperty[0]);
switchActiveForm();
