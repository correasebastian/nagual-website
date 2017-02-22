describe('View', function() {
  var view = app.view;

  describe('Methods', function() {

    var elementHome;

    beforeEach(function() {
      elementHome = affix('.home');
      var elementUploadZone = elementHome.affix('#upload-zone');

      var elementImportArea = elementUploadZone.affix('#import-area');
      elementImportArea.affix('input#import-file[type="file"]');
      elementImportArea.affix('p a#file-browse');

      var elementImportStatus = elementUploadZone.affix('#importStatus');
      elementImportStatus.affix('#head-status');
      elementImportStatus.affix('#error-icon');
      elementImportStatus.affix('#success-icon');
      elementImportStatus.affix('#progress-bar');
      elementImportStatus.affix('.nameFile');
      elementImportStatus.affix('#file-browse');

      elementUploadZone.affix('p#hide-import-zone');

      var elementHistoryZone = elementHome.affix('#history-zone');
      elementHistoryZone.affix('a#show-import-area');

      elementHome.affix('#error-report-modal');
      elementHome.affix('.error-report-icon');

      spyOn(view, 'setListeners');
    });

    describe('init', function() {
      it('should get the elements from the html, and set attributes and listeners', function() {

        var errorClass = 'errorImport';
        var successClass = 'successImport';

        view.init();

        expect(view.$home.get(0)).toBeDefined();
        expect(view.$uploadZone.get(0)).toBeDefined();
        expect(view.$importFileArea.get(0)).toBeDefined();
        expect(view.$inputFile.get(0)).toBeDefined();
        expect(view.$importStatus.get(0)).toBeDefined();
        expect(view.$headStatus.get(0)).toBeDefined();
        expect(view.$errorIcon.get(0)).toBeDefined();
        expect(view.$successIcon.get(0)).toBeDefined();
        expect(view.$progressBar.get(0)).toBeDefined();
        expect(view.$nameFile.get(0)).toBeDefined();
        expect(view.aBrowseFile.get(0)).toBeDefined();
        expect(view.$hideImportArea.get(0)).toBeDefined();

        expect(view.$historyZone.get(0)).toBeDefined();
        expect(view.$aShowImportArea.get(0)).toBeDefined();
        expect(view.$errorReportModal.get(0)).toBeDefined();
        expect(view.$errorReportIcon.get(0)).toBeDefined();

        expect(view.successImportClass).toBe(successClass);
        expect(view.errorImportClass).toBe(errorClass);

        expect(view.setListeners).toHaveBeenCalled();
      });
    });

    describe('setListeners', function() {

      var mockEvent;
      beforeEach(function() {

        view.setListeners.and.callThrough();

      });

      describe('for $importFileArea element', function() {

        var fnOnDragOver,
          fnOnDragLeave,
          files,
          file;

        beforeEach(function() {
          spyOn($.fn, 'on');
          mockEvent = jasmine.createSpyObj('mockEvent', ['preventDefault', 'stopPropagation']);
          file = 'a-file';
          files = [file];
          mockEvent.originalEvent = {
            dataTransfer: {
              files: files
            }
          };
          view.setListeners();
          var fns = $.fn.on.calls.allArgs();
          fnOnDragOver = fns[0][1];
          fnOnDragLeave = fns[1][1];
        });

        describe('for dragover dragenter events', function() {
          it('should add the listener ', function() {
            expect($.fn.on).toHaveBeenCalledWith('dragover dragenter', jasmine.any(Function));

          });

          it('should add the class upLoading', function() {
            spyOn($.fn, 'addClass');

            fnOnDragOver(mockEvent);

            expect($.fn.addClass).toHaveBeenCalledWith("upLoading");
            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockEvent.stopPropagation).toHaveBeenCalled();

          });

        });

        describe('for dragleave dragend drop events', function() {

          it('should add the listener ', function() {
            expect($.fn.on).toHaveBeenCalledWith('dragleave dragend drop', jasmine.any(Function));
          });

          it('should validate if there is a file available, and upload it', function() {
            spyOn($.fn, 'removeClass');
            spyOn(app.controller, 'upload');

            fnOnDragLeave(mockEvent);

            expect($.fn.removeClass).toHaveBeenCalledWith("upLoading");
            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
            expect(app.controller.upload).toHaveBeenCalledWith(file);

          });
        });

      });

      describe('for aBrowseFile $aShowImportArea $hideImportArea  $errorIcon  elements', function() {

        var fnOnBrowseFile,
          fnOnShowImportArea,
          fnHideImportArea,
          fnErrorIcon;

        beforeEach(function() {
          spyOn($.fn, 'click');
          view.setListeners();

          mockEvent = jasmine.createSpyObj('mockEvent', ['preventDefault', 'stopPropagation']);

          var fns = $.fn.click.calls.allArgs();

          fnOnBrowseFile = fns[0][0];
          fnOnShowImportArea = fns[1][0];
          fnHideImportArea = fns[2][0];
          fnErrorIcon = fns[3][0];

        });

        it('should add  the listeners to click events', function() {

          expect($.fn.click).toHaveBeenCalledTimes(4);

        });

        describe('On click #file-browse', function() {

          it('should trigger click on #import-file', function() {
            $.fn.click.calls.reset()

            fnOnBrowseFile(mockEvent);

            expect($.fn.click).toHaveBeenCalled();
            expect(mockEvent.preventDefault).toHaveBeenCalled();
          });

        });

        describe('On click #show-import-area', function() {

          it('should show the upload zone', function() {

            spyOn(view, 'toggleUploadZone');
            fnOnShowImportArea(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(view.toggleUploadZone).toHaveBeenCalled();

          });

        });

        describe('On click #hide-import-zone', function() {

          it('should hide the upload zone', function() {

            spyOn(view, 'toggleUploadZone');
            fnHideImportArea(mockEvent);

            expect(view.toggleUploadZone).toHaveBeenCalled();

          });

        });

        describe('On click #error-icon', function() {

          it('should hide the status area and show the import area', function() {
            spyOn($.fn, 'show');
            spyOn($.fn, 'hide');
            spyOn(view, 'renderProgress');

            fnErrorIcon();

            expect($.fn.show).toHaveBeenCalled();
            expect($.fn.hide).toHaveBeenCalledTimes(2);
            expect(view.renderProgress).toHaveBeenCalledWith('0%');

          });

        });

      });

      describe('for input[type="file"]#import-file', function() {
        var onChange;
        beforeEach(function() {
          spyOn($.fn, 'change');
          view.setListeners();
          onChange = $.fn.change.calls.argsFor(0)[0];

        });

        it('should add  the listener to change event', function() {
          expect($.fn.change).toHaveBeenCalledWith(jasmine.any(Function));

        });

        it('should upload the file', function() {
          var file = 'im-a-file';
          spyOn(app.controller, 'upload');
          spyOn($.fn, 'get').and.returnValue({
            files: [file]
          });

          onChange(mockEvent);

          expect($.fn.get).toHaveBeenCalledWith(0);
          expect(app.controller.upload).toHaveBeenCalledWith(file);

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
        var mockText = mockFilename + ' was uploaded'

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
        spyOn(view, 'renderUploadStatus');

        var mockFilename = 'random-name.csv';
        var mockHeader = 'Error uploading file, try again';
        var mockText = mockFilename + ' was not  uploaded'

        view.renderUploadError(mockFilename);

        expect($.fn.val).toHaveBeenCalledWith('');
        expect($.fn.addClass).toHaveBeenCalledWith(view.errorImportClass);
        expect(view.renderUploadStatus).toHaveBeenCalledWith(mockHeader, mockText);

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

    describe('updateErrorReportModal', function() {

      beforeEach(function() {
        view.init();
      });

      it('should update the content of the error report dialog textarea ', function() {
        var data = "updated";
        spyOn($.fn, 'text');

        view.updateErrorReportModal(data);

        expect($.fn.text).toHaveBeenCalledWith(data);

      });

    });

  });

});
