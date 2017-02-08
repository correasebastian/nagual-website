describe('App Namespace', function() {

  it('should be defined', function() {
      expect(app).toBeDefined();
  });

});

describe('Helpers', function() {
  var helpers = app.helpers;

  describe('Methods', function() {

    describe('request', function() {


      it('should call the $.ajax method with the config object, and respond to the progress event', function() {

        var method = 'method';
        var url = 'http://anyurl.com';
        var data = 'anyData';

        var XmlUpload = jasmine.createSpyObj('XmlUpload', ['addEventListener']);
        var XMLInstance = {
          upload: XmlUpload
        };

        var mockEvent = {
          lengthComputable: true,
          loaded: 4123854,
          total: 4123854
        }


        spyOn($, 'ajax').and.callFake(function(config) {

          expect(config).toBeDefined();
          expect(config.type).toBe(method);
          expect(config.url).toBe(url);
          expect(config.data).toBe(data);
          expect(config.xhr).toEqual(jasmine.any(Function));

          spyOn(window, 'XMLHttpRequest').and.returnValue(XMLInstance);

          XmlUpload.addEventListener.and.callFake(function(eventname, cb) {

            spyOn(app.view, 'renderProgress');
            cb(mockEvent);

            expect(app.view.renderProgress).toHaveBeenCalledWith('100%');

          });

          config.xhr();

          expect(XMLInstance.upload.addEventListener).toHaveBeenCalledWith('progress', jasmine.any(Function), false);

        });

        helpers.request(method, url, data);

      });


    });


    describe('errorLogger', function() {


      it('should write to the console if is defined', function() {
        spyOn(console, 'error');
        var data = 'hi error';
        helpers.errorLogger(data);
        expect(console.error).toHaveBeenCalledWith(data);

      })

    });


  });

});