describe("Home Controller", function() {
  var controller;
  beforeEach(function() {
    controller = app.controller;
  });

  it("should be define", function() {
    expect(controller).toBeDefined();
  });


  describe('Methods', function() {
    var expectedUrl = 'import/upload';
    describe(' init', function() {

      it('should set the postUrl  and call app.view.init method', function() {
        spyOn(app.view, 'init');

        controller.init();
        expect(app.view.init).toHaveBeenCalled();
        expect(controller.postUrl).toBe(expectedUrl);
      });

    });


    describe('upload', function() {


      beforeEach(function() {
        spyOn(controller, 'isValidFile');
      });


      describe('should validate if is a valid file before uploading ,', function() {
        it(' should exit if is not a valid file', function() {
          var mockFile = 'im a file';
          controller.isValidFile.and.returnValue(false);

          controller.upload(mockFile);

          expect(controller.isValidFile).toHaveBeenCalledWith(mockFile);
        });


        describe('if is a valid file', function() {
          var mockFile = {
            name: 'im a file'
          };
          var mockFormData = 'im form data';
          var def;


          beforeEach(function() {

            def = $.Deferred();
            spyOn(app.helpers, 'request').and.returnValue(def);
            controller.isValidFile.and.returnValue(true);
            spyOn(app.helpers, 'buildFormData').and.returnValue(mockFormData);
            spyOn(app.view, 'beforeUpload');
            spyOn(app.view, 'renderUploadSuccess');

          });

          it(' should start an xhr  request, and if the response is OK then call app.view.renderUploadSuccess and refresh the page  ', function() {

            def.resolve();
            spyOn(app.helpers, 'reloadPage').and.returnValue('ok');
            spyOn(window, 'setTimeout').and.callFake(function(fn) {
              fn();
            });

            controller.upload(mockFile);

            expect(controller.isValidFile).toHaveBeenCalledWith(mockFile);
            expect(app.helpers.buildFormData).toHaveBeenCalledWith('import_file', mockFile);
            expect(app.view.beforeUpload).toHaveBeenCalled();
            expect(app.helpers.request).toHaveBeenCalledWith('POST', expectedUrl, mockFormData);
            expect(app.view.renderUploadSuccess).toHaveBeenCalledWith(mockFile.name);
            expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 3000);
            expect(app.helpers.reloadPage).toHaveBeenCalled();


          });

          it(' should start an xhr  request, and if the response is an Error  then call app.view.renderUploadSuccess and refresh the page  ', function() {
            def.reject();
            spyOn(app.view, 'renderUploadError');
            spyOn(app.helpers, 'errorLogger');

            controller.upload(mockFile);

            expect(app.helpers.request).toHaveBeenCalledWith('POST', expectedUrl, mockFormData);

            expect(app.helpers.errorLogger).toHaveBeenCalled();

            expect(app.view.renderUploadError).toHaveBeenCalledWith(mockFile.name);

          });
        });
      });
    });


    describe('isValidFile', function() {
       var result;
        var mockFile= {
          name:''
        }


        beforeEach(function() {
          spyOn(app.helpers, 'errorLogger');
        });


      it('should return false if the file is falsy value', function() {
        result = controller.isValidFile();
        expect(result).toBe(false);
         expect(app.helpers.errorLogger).toHaveBeenCalled();
      });

      it('should return false if the extension is different of .csv', function() {
        mockFile.name='not-a-csv.notcvs'
        result = controller.isValidFile(mockFile);
        expect(result).toBe(false);
         expect(app.helpers.errorLogger).toHaveBeenCalled();
      });

       it('should return true if the extension is  .csv', function() {
        mockFile.name='im-a-csv.csv'
        result = controller.isValidFile(mockFile);
        expect(result).toBe(true);
      });


    });

  });

});


// //demonstrates use of expected exceptions
// describe("#resume", function() {
//   it("should throw an exception if song is already playing", function() {
//     player.play(song);

//     expect(function() {
//       player.resume();
//     }).toThrowError("song is already playing");
//   });
// });