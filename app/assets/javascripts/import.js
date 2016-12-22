var app = {
  nagual: {}
};

(function(app) {

  var importer = {
    uploadFile: uploadFile,
    init: init
  };

  function uploadFile() {
    var importBox = $('#import_file');
    var fileBrowse = $('#file-browse');

    fileBrowse.click(function (e) {
      if (importBox) {
        importBox.click();
      }
      e.preventDefault();
    });
  }

  function init() {
    uploadFile();
  }

  app.nagual.importer = importer;

})(app);

$(function () {
  app.nagual.importer.init();
});


