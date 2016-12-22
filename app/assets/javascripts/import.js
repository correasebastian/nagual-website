var app = {};

(function(app) {

  var importer = {
    getFile: getFile
  };

  function getFile() {
    var importBox = $('#import_file');
    var fileBrowse = $('#file-browse');
    fileBrowse.click(function (e) {
      if (importBox) {
        importBox.click();
      }
      e.preventDefault();
    });
  }

  app.nagual = importer;

})(app);

app.nagual.getFile();

