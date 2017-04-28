import {
  Home
} from './home';

import {
  setModal
} from './modal';

import VanillaModal from 'vanilla-modal';
import {
  Validation
} from './validation'; // Native

import{$} from './util';
// Check if the DOMContentLoaded has already been completed


export const main = {
  setListener() {
    var docState= $.getDocumentState();
    if (docState === 'complete' || docState !== 'loading') {
      this.initApp();
    } else {
      $.onDocument('DOMContentLoaded', () => {
        this.initApp();
      });
    }

  },
  initApp() {
    var home = new Home();
    home.init();
    // debugger;
    Validation.init($.byId('demo-form'), true);
    setModal(VanillaModal);
  },

};
