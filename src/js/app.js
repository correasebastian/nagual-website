import '../styles/site.scss';
/*import {
  uno
} from './util';*/

import {main} from './main';
if (process.env.NODE_ENV !== 'production') {
  require('file-loader!../index.html');
  //  chunkhash is only changing when the js bundle change, not the css in production because we are using extract so the js does not change
}

main.setListener();
