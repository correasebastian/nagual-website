import {
  $
} from './util';
import {
  main
} from './main';

import {
  spy,
  stub,
  assert,
  match
} from 'sinon';

import * as homeObj from './home';
import * as modalObj from './modal';
import VanillaModal from 'vanilla-modal';

import {
  Validation
} from './validation';

import {
  // expect
} from 'chai';


describe('app.js methods', function() {

  describe('appMainListener', function() {

    // var validation;
    // var home;

    beforeEach(function() {

      stub($, 'getDocumentState');
      stub(main, 'initApp');
    });

    afterEach(function() {
      $.getDocumentState.restore();
      main.initApp.restore();

    });


    describe('when de document.readyState=== complete or document.ready!== \'loading\' ', function() {


      it('should call the init method ', function() {

        $.getDocumentState.returns('complete');

        main.setListener();

        assert.calledOnce($.getDocumentState);
        assert.calledOnce(main.initApp);


      });

      it('should call the init method ', function() {

        $.getDocumentState.returns('anythingButLoading');

        main.setListener();

        assert.calledOnce($.getDocumentState);
        assert.calledOnce(main.initApp);

      });

    });



    describe('when de document.readyState===loading', function() {

      it('should not call the init mehtod, instead shoud set a listener for DOMContentLoaded', function() {
        stub($, 'onDocument');
        $.getDocumentState.returns('loading');

        main.setListener();

        assert.calledWith($.onDocument, 'DOMContentLoaded', match.func);
        assert.notCalled(main.initApp);
        $.onDocument.restore();
      });

    });




  });


  describe('initApp', function() {


    beforeEach(function() {
      stub(Validation, 'init');
      stub(modalObj, 'setModal');
      stub($, 'byId');
    });


    afterEach(function() {
      Validation.init.restore();
      modalObj.setModal.restore();
      $.byId.restore();
    });



    it('should call Home class, and init method, Validation.init', function() {
      var homeInstance = {
        init: spy()
      };
      var $demoForm = {};
      var $emailForm = {};
      $.byId.onCall(0).returns($demoForm);
      $.byId.onCall(1).returns($emailForm);
      stub(homeObj, 'Home').returns(homeInstance);
      // console.info(modalObj);

      main.initApp();

      assert.calledWithNew(homeObj.Home);
      assert.calledOnce(homeInstance.init);
      assert.calledWith($.byId, 'demo-form');
      assert.calledWith(Validation.init, $demoForm, true);
      assert.calledWith($.byId, 'email-form');
      assert.calledWith(Validation.init, $emailForm, true);
      assert.calledWith(modalObj.setModal, VanillaModal);

    });

  });


});
