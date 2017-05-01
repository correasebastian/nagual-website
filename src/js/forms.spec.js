import {
  $
} from './util';


import {
  stub,
  assert
} from 'sinon';

import {
  Validation
} from './validation';

import {
  baseForm,
  demoForm,
  emailForm
} from './forms';

import {
  expect
} from 'chai';


describe('forms.js ', function() {

  describe('baseForm', function() {


    describe('Methods', function() {

      describe('init', function() {

        let testForm;

        beforeEach(function() {
          testForm = Object.create(baseForm);
        });


        it('should receive an id of an element and storage in id property', function() {

          const id = 'anyId';

          testForm.init(id);

          expect(testForm.id).to.eql(id);

        });


        describe('after init', function() {
          let id;
          beforeEach(function() {
            id = 'anyId';
            testForm.init(id);
          });



          afterEach(function() {});



          describe('initDom', function() {
            it('should get the element refence and call setValidation', function() {

              // const id = 'anyId';
              var fakeElement = {};
              stub($, 'byId').returns(fakeElement);
              stub(testForm, 'setValidation');

              testForm.initDom();

              assert.calledWith($.byId, id);
              assert.calledWith(testForm.setValidation, fakeElement, true);

              testForm.setValidation.restore();
              $.byId.restore();

            });

          });

          describe('setValidation', function() {


            beforeEach(function() {
              stub(Validation, 'init');
            });



            afterEach(function() {
              Validation.init.restore();
            });


            it('call the validation.init with the config parameters', function() {

              // const id = 'anyId';
              const form = {};
              const inline = true;


              testForm.setValidation(form, inline);


              assert.calledWith(Validation.init, form, inline);


            });


            it('call the validation.init with the config parameters and a callback if the oject has a postData function', function() {

              // const id = 'anyId';
              const form = {};
              const inline = true;
              const fn = () => {};

              testForm.postData = fn;

              testForm.setValidation(form, inline);


              assert.calledWith(Validation.init, form, inline, fn);


            });

          });



        });


      });

    });






  });




  describe('emailForm', function() {

    console.log(emailForm);

    it('should prototype point to baseForm', function() {
      expect(Object.getPrototypeOf(emailForm)).to.eql(baseForm);
    });


  });


   describe('demoForm', function() {

    console.log(demoForm);

    it('should prototype point to baseForm', function() {
      expect(Object.getPrototypeOf(demoForm)).to.eql(baseForm);
    });


  });


});
