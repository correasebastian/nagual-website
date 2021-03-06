import {
  expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import {
  modal
} from './modal';
import {
  assert,
  stub
} from 'sinon';
import * as VanillaModal from 'vanilla-modal';


describe('Modal ', () => {

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


  describe('Elements on Dom', () => {


    describe('modal container', function() {
      it('should have a set of element that gonna wrap the content ', () => {
        const $modal = document.querySelector('.modal');
        const $modalInner = $modal.querySelector('.modal-inner');
        const $aClose = $modalInner.querySelector('a[data-modal-close]');
        const $modalContent = $modalInner.querySelector('.modal-content');


        expect($modal).to.exist;
        expect($modalInner).to.exist;
        expect($aClose).to.exist;
        expect($modalContent).to.exist;


      });
    });

    it('should have one #modal-demo-form and a[href="#modal-demo-form"]', () => {
      const $modalDemoForm = document.getElementById('modal-demo-form');
      const $aOpenModalDemo = document.querySelector('a[href="#modal-demo-form"]');
      expect($aOpenModalDemo).to.exist;
      expect($modalDemoForm).to.exist;

    });

  });


  describe('init', function() {

    it('should call a new VanillaModal with config object', function() {

      let fakeInstance = {};
      stub(VanillaModal, 'default').returns(fakeInstance);

      modal.init();

      assert.calledWithNew(VanillaModal.default);
      assert.calledWith(VanillaModal.default, {});
      expect(modal.instance).to.eql(fakeInstance);

      VanillaModal.default.restore();

    });

  });

});
