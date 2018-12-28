/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface AgcAdjustedScrotalCircumferenceProgress {
    'socket': string;
  }
  interface AgcAdjustedScrotalCircumferenceProgressAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcAdjustedScrotalCircumferenceResultsPlaceholder {}
  interface AgcAdjustedScrotalCircumferenceResultsPlaceholderAttributes extends StencilHTMLAttributes {}

  interface AgcAdjustedScrotalCircumferenceResults {
    'socket': string;
  }
  interface AgcAdjustedScrotalCircumferenceResultsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcAdjustedScrotalCircumference {
    'mode': 'full' | 'step';
    'socket': string;
    'tract': string;
    'units': any;
  }
  interface AgcAdjustedScrotalCircumferenceAttributes extends StencilHTMLAttributes {
    'mode'?: 'full' | 'step';
    'onAgcCalculated'?: (event: CustomEvent) => void;
    'onAgcStepChanged'?: (event: CustomEvent) => void;
    'socket'?: string;
    'tract'?: string;
    'units'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AgcAdjustedScrotalCircumferenceProgress': Components.AgcAdjustedScrotalCircumferenceProgress;
    'AgcAdjustedScrotalCircumferenceResultsPlaceholder': Components.AgcAdjustedScrotalCircumferenceResultsPlaceholder;
    'AgcAdjustedScrotalCircumferenceResults': Components.AgcAdjustedScrotalCircumferenceResults;
    'AgcAdjustedScrotalCircumference': Components.AgcAdjustedScrotalCircumference;
  }

  interface StencilIntrinsicElements {
    'agc-adjusted-scrotal-circumference-progress': Components.AgcAdjustedScrotalCircumferenceProgressAttributes;
    'agc-adjusted-scrotal-circumference-results-placeholder': Components.AgcAdjustedScrotalCircumferenceResultsPlaceholderAttributes;
    'agc-adjusted-scrotal-circumference-results': Components.AgcAdjustedScrotalCircumferenceResultsAttributes;
    'agc-adjusted-scrotal-circumference': Components.AgcAdjustedScrotalCircumferenceAttributes;
  }


  interface HTMLAgcAdjustedScrotalCircumferenceProgressElement extends Components.AgcAdjustedScrotalCircumferenceProgress, HTMLStencilElement {}
  var HTMLAgcAdjustedScrotalCircumferenceProgressElement: {
    prototype: HTMLAgcAdjustedScrotalCircumferenceProgressElement;
    new (): HTMLAgcAdjustedScrotalCircumferenceProgressElement;
  };

  interface HTMLAgcAdjustedScrotalCircumferenceResultsPlaceholderElement extends Components.AgcAdjustedScrotalCircumferenceResultsPlaceholder, HTMLStencilElement {}
  var HTMLAgcAdjustedScrotalCircumferenceResultsPlaceholderElement: {
    prototype: HTMLAgcAdjustedScrotalCircumferenceResultsPlaceholderElement;
    new (): HTMLAgcAdjustedScrotalCircumferenceResultsPlaceholderElement;
  };

  interface HTMLAgcAdjustedScrotalCircumferenceResultsElement extends Components.AgcAdjustedScrotalCircumferenceResults, HTMLStencilElement {}
  var HTMLAgcAdjustedScrotalCircumferenceResultsElement: {
    prototype: HTMLAgcAdjustedScrotalCircumferenceResultsElement;
    new (): HTMLAgcAdjustedScrotalCircumferenceResultsElement;
  };

  interface HTMLAgcAdjustedScrotalCircumferenceElement extends Components.AgcAdjustedScrotalCircumference, HTMLStencilElement {}
  var HTMLAgcAdjustedScrotalCircumferenceElement: {
    prototype: HTMLAgcAdjustedScrotalCircumferenceElement;
    new (): HTMLAgcAdjustedScrotalCircumferenceElement;
  };

  interface HTMLElementTagNameMap {
    'agc-adjusted-scrotal-circumference-progress': HTMLAgcAdjustedScrotalCircumferenceProgressElement
    'agc-adjusted-scrotal-circumference-results-placeholder': HTMLAgcAdjustedScrotalCircumferenceResultsPlaceholderElement
    'agc-adjusted-scrotal-circumference-results': HTMLAgcAdjustedScrotalCircumferenceResultsElement
    'agc-adjusted-scrotal-circumference': HTMLAgcAdjustedScrotalCircumferenceElement
  }

  interface ElementTagNameMap {
    'agc-adjusted-scrotal-circumference-progress': HTMLAgcAdjustedScrotalCircumferenceProgressElement;
    'agc-adjusted-scrotal-circumference-results-placeholder': HTMLAgcAdjustedScrotalCircumferenceResultsPlaceholderElement;
    'agc-adjusted-scrotal-circumference-results': HTMLAgcAdjustedScrotalCircumferenceResultsElement;
    'agc-adjusted-scrotal-circumference': HTMLAgcAdjustedScrotalCircumferenceElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
