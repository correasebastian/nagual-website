import {
  expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {

  var window;
  beforeEach((done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    jsdom.env(index, function(err, win) {
      window = win;
      done();
    });
  });

  afterEach(() => {
    window.close();
  });


  it('should have h1 that says Users', () => {
    const title = window.document.getElementsByTagName('title')[0];
    expect(title.innerHTML).to.equal('Nagual - Your Salesforce Commerce Cloud Catalog Tool');

  });
});
