import '../styles/site.scss';
/*import {
  uno
} from './util';*/

import {
  Home
} from './home';

import {
  setModal
} from './modal';

import VanillaModal from 'vanilla-modal';

if (process.env.NODE_ENV !== 'production') {
  require('file-loader!../index.html');
  //  chunkhash is only changing when the js bundle change, not the css in production because we are using extract so the js does not change
}

// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}

function initApp() {
  var home = new Home();
  home.init();
  setModal(VanillaModal);
}
