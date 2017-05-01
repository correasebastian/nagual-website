
import {
  Home
} from './home';

import {
  modal
} from './modal';

/*import {
  Validation
} from './validation'; // Native
*/
import {
  $
} from './util';

/*import {
  demoForm
} from './demo-form';
*/
import {
  emailForm, demoForm
} from './forms';
// Check if the DOMContentLoaded has already been completed



export const main = {
  setListener() {
    var docState = $.getDocumentState();
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
    demoForm.initDom();
    emailForm.initDom();
    // Validation.init($.byId('email-form'), true);
    modal.init();
  },

};
