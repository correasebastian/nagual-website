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

        expect(view.$uploadZone).toBeDefined();
        expect(view.$importFileArea).toBeDefined();
        expect(view.$inputFile).toBeDefined();
        expect(view.$importStatus).toBeDefined();
        expect(view.$headStatus).toBeDefined();
        expect(view.$progressBar).toBeDefined();
        expect(view.$nameFile).toBeDefined();
        expect(view.aBrowseFile).toBeDefined();
        expect(view.$hideImportArea).toBeDefined();

        expect(view.$historyZone).toBeDefined();
        expect(view.$aShowImportArea).toBeDefined();


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







  });

});