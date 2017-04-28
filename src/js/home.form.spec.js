import {
  expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';


describe('Home Forms ', () => {

  var w; // this is gonna have the reference to the window object;
  var document;
  beforeEach((done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    jsdom.env(index, function(err, window) {
      w = window;
      document = w.document;
      global.document = document;
      done();
    });
  });

  afterEach(() => {
    w.close();
  });


  describe('demo Form', () => {
    it('should have one form#demo-form with action attributte and method propertly set', () => {
      const $demoForm = document.querySelector('form#demo-form');
      const action = $demoForm.getAttribute('action');
      const method = $demoForm.getAttribute('method');
      expect($demoForm).to.exist;
      expect(action).to.equal('/');
      expect(method).to.equal('get');

    });


    describe('inputs', function() {
      var $demoForm;
      beforeEach(function() {
        $demoForm = document.querySelector('form#demo-form');
      });

      var inputs = [{
        type: 'text',
        name: 'fullname',
        required: true
      }, {
        type: 'text',
        name: 'company',
        required: true
      }, {
        type: 'text',
        name: 'role',
        required: true
      }, {
        type: 'email',
        name: 'email',
        required: true
      }, {
        type: 'tel',
        name: 'phone',
        required: false
      }, {
        type: 'submit'
      }];

      inputs.forEach(input => {
        var selector = 'input';
        Object.keys(input)
          .filter(key => {
            return key !== 'required';
          }).forEach(key => {
            selector += `[${key}="${input[key]}"]`;
          });

        if (input.required) {
          selector += '[required]';
        }

        it(`should have one ${selector} `, () => {
          const $inputFullname = $demoForm.querySelector(selector);
          expect($inputFullname).to.exist;

        });
      });

    });



  });


  describe('email Form', () => {
    it('should have one form#email-form with action attributte and method propertly set', () => {
      const $emailForm = document.querySelector('form#email-form');
      const action = $emailForm.getAttribute('action');
      const method = $emailForm.getAttribute('method');
      expect($emailForm).to.exist;
      expect(action).to.equal('/');
      expect(method).to.equal('get');

    });


    describe('inputs', function() {
      var $emailForm;
      beforeEach(function() {
        $emailForm = document.querySelector('form#email-form');
      });



      var inputs = [{
        type: 'email',
        name: 'email_address',
        required: true
      }, {
        type: 'image'
      }];

      inputs.forEach(input => {
        var selector = 'input';
        Object.keys(input)
          .filter(key => {
            return key !== 'required';
          }).forEach(key => {
            selector += `[${key}="${input[key]}"]`;
          });

        if (input.required) {
          selector += '[required]';
        }

        it(`should have one ${selector} `, () => {
          const $inputFullname = $emailForm.querySelector(selector);
          expect($inputFullname).to.exist;

        });
      });

    });



  });

});
