import {
  expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';


describe('Footer ', () => {

  var w; // this is gonna have the reference to the window object;
  var document;
  beforeEach((done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    jsdom.env(index, function(err, window) {
      w = window;
      document = w.document;
      done();
    });
  });

  afterEach(() => {
    w.close();
  });


  it('should have one footer.main-footer element', () => {
    const $footer = document.querySelector('footer.main-footer');

    expect($footer).to.exist;

  });


  describe('social Links', () => {
    var $footer;
    beforeEach(() => {
      $footer = document.querySelector('footer.main-footer');
    });


    it('should have an ancher and redirect to sawyer website', () => {
      var $sawyerWebsiteAncher = $footer.querySelector('.a-sawyer-website');
      var url = $sawyerWebsiteAncher.getAttribute('href');
      expect($sawyerWebsiteAncher).to.exist;
      expect(url).to.eql('http://www.sawyereffect.com/');
    });

    it('should have an facebook ancher and redirect to sawyer facebook page', () => {
      var $sawyerFbAncher = $footer.querySelector('.a-sawyer-fb');
      var url = $sawyerFbAncher.getAttribute('href');
      expect($sawyerFbAncher).to.exist;
      expect(url).to.eql('https://www.facebook.com/sawyereffect/');
    });

     it('should have an twitter ancher and redirect to sawyer twitter page', () => {
      var $sawyerTwAncher = $footer.querySelector('.a-sawyer-tw');
      var url = $sawyerTwAncher.getAttribute('href');
      expect($sawyerTwAncher).to.exist;
      expect(url).to.eql('https://twitter.com/sawyereffect');
    });

     it('should have an linkedin ancher and redirect to sawyer linkedin page', () => {
      var $sawyerLkAncher = $footer.querySelector('.a-sawyer-lk');
      var url = $sawyerLkAncher.getAttribute('href');
      expect($sawyerLkAncher).to.exist;
      expect(url).to.eql('https://www.linkedin.com/company/sawyer-effect-llc');
    });


  });

});
