describe('View', function() {
  var view = app.view;


  describe('Methods', function() {


    var elementHome;

    beforeEach(function() {
      elementHome = affix('.home');
      var elementUploaZone = elementHome.affix('#upload-zone');


      var elementImportArea = elementUploaZone.affix('#import-area');
      elementImportArea.affix('input#import-file[type="file"]');
      elementImportArea.affix('p a#file-browse');

      var elementImportStatus = elementUploaZone.affix('#importStatus');
      elementImportStatus.affix('#head-status');
      elementImportStatus.affix('#progress-bar');
      elementImportStatus.affix('.nameFile');
      elementImportStatus.affix('#file-browse');

      elementUploaZone.affix('p#hide-import-zone');


      var elementHistoryZone = elementHome.affix('#history-zone');
      elementHistoryZone.affix('a#show-import-area');

      spyOn(view, 'setAttributes');
      spyOn(view, 'setListeners');


    });


    describe('init', function() {
      it('should get the elements from the html, and set attributes and listeners', function() {

        // spyOn(window, '$').and.callThrough();

        var errorClass = 'errorImport'
        var successClass = 'successImport';

        view.init();

        expect(view.$home.get(0)).toBeDefined();
        expect(view.$uploadZone.get(0)).toBeDefined();
        expect(view.$importFileArea.get(0)).toBeDefined();
        expect(view.$inputFile.get(0)).toBeDefined();
        expect(view.$importStatus.get(0)).toBeDefined();
        expect(view.$headStatus.get(0)).toBeDefined();
        expect(view.$progressBar.get(0)).toBeDefined();
        expect(view.$nameFile.get(0)).toBeDefined();
        expect(view.aBrowseFile.get(0)).toBeDefined();
        expect(view.$hideImportArea.get(0)).toBeDefined();

        expect(view.$historyZone.get(0)).toBeDefined();
        expect(view.$aShowImportArea.get(0)).toBeDefined();


        expect(view.successImportClass).toBe(successClass);
        expect(view.errorImportClass).toBe(errorClass);


        expect(view.setAttributes).toHaveBeenCalled();
        expect(view.setListeners).toHaveBeenCalled();

      });
    });



    describe('setAttributes', function() {


      beforeEach(function() {
        view.setAttributes.and.callThrough();
      });


      it('should set some attibutes to input file element ', function() {
        spyOn($.fn, 'attr');

        view.setAttributes();
        expect($.fn.attr).toHaveBeenCalledWith('accept', '.csv');
      });



    });



    describe('setListeners', function() {

      beforeEach(function() {
        view.setListeners.and.callThrough();


      });


      describe('for $importFileArea element', function() {

        beforeEach(function() {
          spyOn($.fn, 'on');
          view.setListeners();
        });


        describe('for dragover dragenter events', function() {
          it('should add the listener ', function() {
            expect($.fn.on).toHaveBeenCalledWith('dragover dragenter', jasmine.any(Function));

          });

        });


        describe('for dragleave dragend drop events', function() {

          it('sholud add the listener ', function() {
            expect($.fn.on).toHaveBeenCalledWith('dragleave dragend drop', jasmine.any(Function));
          });
        });




      });


      describe('for aBrowseFile $aShowImportArea $hideImportArea   elements', function() {


        var fnOnBrowseFile,
          fnOnShowImportArea,
          fnHideImportArea;

        beforeEach(function() {
          spyOn($.fn, 'click');
          view.setListeners();


          var fns = $.fn.click.calls.allArgs();

          fnOnBrowseFile = fns[0][0];
          fnOnShowImportArea = fns[1][0];
          fnHideImportArea = fns[2][0];

        });



        it('should add  the listener to click event', function() {
          expect($.fn.click).toHaveBeenCalledTimes(3);

        });


      });


      describe('for $inputFile', function() {

        beforeEach(function() {
          spyOn($.fn, 'change');
          view.setListeners();

        });



        it('should add  the listener to change event', function() {
          expect($.fn.change).toHaveBeenCalledWith(jasmine.any(Function));

        });

      });




    });



    describe('renderProgress', function() {


      beforeEach(function() {
        view.init();
      });



      it('should set the css width property , aria-valuenow attribute and the text ', function() {
        spyOn($.fn, 'css');
        spyOn($.fn, 'attr');
        spyOn($.fn, 'text');

        var mockPercentage = '50%';

        view.renderProgress(mockPercentage);

        expect($.fn.css).toHaveBeenCalledWith('width', mockPercentage);
        expect($.fn.attr).toHaveBeenCalledWith('aria-valuenow', mockPercentage);
        expect($.fn.text).toHaveBeenCalledWith(mockPercentage);

      });


    });


    describe('renderUploadSuccess', function() {


      beforeEach(function() {
        view.init();
      });



      it('should reset the input file, add successclass to the import area, and display the success text ', function() {
        spyOn($.fn, 'val');
        spyOn($.fn, 'addClass');
        spyOn(view, 'renderUploadStatus');

        var mockFilename = 'random-name.csv';
        var mockHeader = 'Loaded correctly';
        var mockText = mockFilename + ' was  uploaded, the page will be refreshed in 3 seconds ...'

        view.renderUploadSuccess(mockFilename);

        expect($.fn.val).toHaveBeenCalledWith('');
        expect($.fn.addClass).toHaveBeenCalledWith(view.successImportClass);
        expect(view.renderUploadStatus).toHaveBeenCalledWith(mockHeader, mockText);

      });


    });


    describe('renderUploadError', function() {


      beforeEach(function() {
        view.init();
      });

      it('should reset the input file, add successclass to the import area, and display the success text ', function() {
        spyOn($.fn, 'val');
        spyOn($.fn, 'addClass');
        spyOn($.fn, 'show');
        spyOn(view, 'renderUploadStatus');

        var mockFilename = 'random-name.csv';
        var mockHeader = 'Error uploading file';
        var mockText = mockFilename + ' was not  uploaded'

        view.renderUploadError(mockFilename);

        expect($.fn.val).toHaveBeenCalledWith('');
        expect($.fn.addClass).toHaveBeenCalledWith(view.errorImportClass);
        expect(view.renderUploadStatus).toHaveBeenCalledWith(mockHeader, mockText);
        expect($.fn.show).toHaveBeenCalled();

      });


    });

    describe('renderUploadStatus', function() {


      beforeEach(function() {
        view.init();
      });

      it('should reset the input file, add successclass to the import area, and display the success text ', function() {
        spyOn($.fn, 'text');

        var mockHeader = 'any headline';
        var mockText = 'any text';

        view.renderUploadStatus(mockHeader, mockText);

        expect($.fn.text).toHaveBeenCalledWith(mockHeader);
        expect($.fn.text).toHaveBeenCalledWith(mockText);


      });


    });


    describe('beforeUpload', function() {


      beforeEach(function() {
        view.init();
      });

      it('should reset the input file, add successclass to the import area, and display the success text ', function() {
        spyOn($.fn, 'hide');
        spyOn($.fn, 'show');
        spyOn($.fn, 'removeClass');
        spyOn(view, 'renderUploadStatus');
        var mockremoveclass = view.successImportClass + ' ' + view.errorImportClass;

        view.beforeUpload();

        expect($.fn.hide).toHaveBeenCalled();
        expect($.fn.show).toHaveBeenCalled();
        expect($.fn.removeClass).toHaveBeenCalledWith(mockremoveclass);
        expect(view.renderUploadStatus).toHaveBeenCalledWith('uploading ...', '');


      });


    });


    describe('toggleUploadZone', function() {


      beforeEach(function() {
        view.init();
      });

      it('should reset the input file, add successclass to the import area, and display the success text ', function() {
        spyOn($.fn, 'hide');
        spyOn($.fn, 'toggleClass');


        view.toggleUploadZone();

        expect($.fn.hide).toHaveBeenCalled();
        expect($.fn.toggleClass).toHaveBeenCalledWith('hide');
        expect($.fn.toggleClass).toHaveBeenCalledWith('flex flex-col flex-center');


      });


    });


  });

});