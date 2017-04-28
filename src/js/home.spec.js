import {
  expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import {
  Home
} from './home';
import {
  stub,
  assert,
  match
} from 'sinon';
import {
  API_BASE_URL
} from './api';

describe('Home ', () => {

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


  describe('Element references', () => {
    it('should have one video#home-video element with 2 sources children elements with the proper src attributte', () => {
      const $video = document.querySelector('video#home-video');
      const sources = $video.querySelectorAll('source');
      const srcArray = Array.from(sources).map(ele => ele.getAttribute('src'));
      expect($video).to.exist;
      expect(sources.length).to.be.at.least(2);
      expect(srcArray).to.include('images/home/se-intro-final.webm');
      expect(srcArray).to.include('images/home/se-intro-final.mp4');

    });

    it('should have one button.btn-play element ', () => {
      const $btnPlay = document.querySelector('[role="button"].btn-play');
      expect($btnPlay).to.exist;

    });

    it('should have one a.btn-get-started element ', () => {
      const $btnDemo = document.querySelector('a.btn-get-started');
      expect($btnDemo).to.exist;

    });

  });


  describe('Home Class', () => {

    var home;
    var $video;
    var $btnPlay;
    var $btnDemo;
    beforeEach(() => {
      home = new Home();
      $video = document.querySelector('video#home-video');
      $btnPlay = document.querySelector('.btn-play');
      $btnDemo = document.querySelector('.btn-get-started');
    });

    describe('Methods', function() {

      describe('Init', function() {
        it('should get references of the elements', () => {
          stub(home, 'setListeners');
          stub(home, 'setbaseUrl');

          home.init();

          expect(home.$video).to.equal($video);
          expect(home.$btnPlay).to.equal($btnPlay);
          assert.calledOnce(home.setListeners);
          assert.calledWith(home.setbaseUrl, API_BASE_URL);

          home.setListeners.restore();
          home.setbaseUrl.restore();
        });
      });


      describe('setbaseurl', function() {

        it('should append the base Url on all the forms ', function() {

          var baseUrl = 'anybaseurl';
          var actions = Array.from(document.forms).map(form => {
            return `${baseUrl}${form.getAttribute('action')}`;
          });

          // console.info(actions);

          home.setbaseUrl(baseUrl);


          Array.from(document.forms).forEach(form => {
            var action = form.getAttribute('action');
            expect(actions).to.include(action);
          });




        });

      });



      describe('after Init', function() {


        beforeEach(function() {
          home.init();
        });

        describe('setListeners', function() {
          it('click  btn-play', () => {

            stub($btnPlay, 'addEventListener');

            home.setListeners();

            assert.calledWith($btnPlay.addEventListener, 'click', match.func);
            $btnPlay.addEventListener.restore();
          });

          it('ended  video', () => {

            stub($video, 'addEventListener');

            home.setListeners();

            assert.calledWith($video.addEventListener, 'ended', match.func);
            $video.addEventListener.restore();
          });

          it('playing  video', () => {

            stub($video, 'addEventListener');

            home.setListeners();

            assert.calledWith($video.addEventListener, 'playing', match.func);

            $video.addEventListener.restore();
          });

          it('on click  btn-play', () => {

            stub($video, 'play');
            stub($btnPlay.classList, 'add');
            stub($btnDemo.classList, 'add');
            stub($video, 'setAttribute');

            home.setListeners();

            var e = new w.Event('click');

            $btnPlay.dispatchEvent(e);

            assert.called($video.play);
            assert.calledWith($btnPlay.classList.add, 'hidden-xs-up');
            assert.calledWith($btnDemo.classList.add, 'playing');
            assert.calledWith($video.setAttribute, 'controls', '');

            $video.play.restore();
            $btnPlay.classList.add.restore();
            $btnDemo.classList.add.restore();
            $video.setAttribute.restore();

          });

          it('on ended  video', () => {

            stub($btnPlay.classList, 'remove');
            stub($btnDemo.classList, 'remove');
            stub($video.classList, 'add');
            stub($video, 'removeAttribute');

            home.setListeners();

            var e = new w.Event('ended');

            $video.dispatchEvent(e);

            assert.calledWith($btnPlay.classList.remove, 'hidden-xs-up');
            assert.calledWith($btnDemo.classList.remove, 'playing');
            assert.calledWith($video.classList.add, 'hide-native-ios-play-btn');
            assert.calledWith($video.removeAttribute, 'controls');

            $btnPlay.classList.remove.restore();
            $btnDemo.classList.remove.restore();
            $video.classList.add.restore();
            $video.removeAttribute.restore();

          });


          it('on playing  video', () => {


            stub($video.classList, 'remove');

            home.setListeners();

            var e = new w.Event('playing');

            $video.dispatchEvent(e);


            assert.calledWith($video.classList.remove, 'hide-native-ios-play-btn');

            $video.classList.remove.restore();


          });


        });
      });

    });
  });

});
