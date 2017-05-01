import {
  Validation
} from './validation'; // Native

import {
  $
} from './util';

import {
  modal
} from './modal';


/*
//you have to overrride this if you want to do something after the validation;
  postData() {

  }*/

export const baseForm = {
  init(id) {
    this.id = id;
  },
  initDom() {
    let $form = $.byId(this.id);
    this.setValidation($form, true);
  },
  setValidation(form, inline) {
    /*Validation.init(this.$form, true, (e) => {
      this.postData(e);
    });*/

    var args = [form, inline];
    if (typeof this.postData === 'function') {
      args.push(this.postData);
    }
    Validation.init(...args);
  }
};


/*export const emailForm = Object.assign({}, baseForm, {
  postData(e) {
    console.log(e.currentTarget);
  }
});
*/
export const emailForm = Object.create(baseForm);

emailForm.postData = function(e) {
  let $ele = e.currentTarget;
  // console.log('demoForm', e.currentTarget);
  let [action, method] = $.getActionMethod($ele);

  const jsonData = $.formTojson($ele);
  // console.log('email-form', e.currentTarget);
  $.fetch(action, method, jsonData)
    .then(function(json) {
      console.log('parsed json', json);
      $ele.reset();
      alert('success');
    }).catch(function(ex) {
      console.log('parsing inside the demoform failed', ex);
    });
};
emailForm.init('email-form');



export const demoForm = Object.create(baseForm);
demoForm.postData = function(e) {

  const $ele = e.currentTarget;
  const $btn = $ele.querySelector('input[type="submit"]');
  $btn.disabled = true;
  // console.log('demoForm', e.currentTarget);
  const [action, method] = $.getActionMethod($ele);

  const jsonData = $.formTojson($ele);

  $.fetch(action, method, jsonData)
    .then(function(json) {
      console.log('parsed json', json);
      $btn.disabled = false;
      $ele.reset();
      alert('success');
      modal.instance.close();
    }).catch(function(ex) {
      console.log('parsing inside the demoform failed', ex);
      $btn.disabled = false;
    });
};
demoForm.init('demo-form');
