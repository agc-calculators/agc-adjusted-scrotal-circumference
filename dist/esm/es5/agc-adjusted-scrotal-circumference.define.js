
// AgcAdjustedScrotalCircumference: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './agc-adjusted-scrotal-circumference.core.js';
import {
  AgcAdjustedScrotalCircumference,
  AgcAdjustedScrotalCircumferenceProgress,
  AgcAdjustedScrotalCircumferenceResults,
  AgcAdjustedScrotalCircumferenceResultsPlaceholder
} from './agc-adjusted-scrotal-circumference.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcAdjustedScrotalCircumference,
    AgcAdjustedScrotalCircumferenceProgress,
    AgcAdjustedScrotalCircumferenceResults,
    AgcAdjustedScrotalCircumferenceResultsPlaceholder
  ], opts);
}
