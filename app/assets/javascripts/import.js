var app = {
  nagual: {}
};

(function(app) {

  var importer = {
    uploadFile: uploadFile,
    init: init
  };

  function dragFile() {
    var importFileArea = $('#import-area');

    importFileArea.on( 'dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });

    importFileArea.on( 'dragenter', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });

    importFileArea.on( 'drop', function(e) {

      if(e.originalEvent.dataTransfer){
        files = e.originalEvent.dataTransfer.files;
        if(files.length) {
          e.preventDefault();
          e.stopPropagation();
          upload(files[0]);
        }
      }
    });

  }

  function uploadFile() {
    var importBox = $('#import-file');
    var fileBrowse = $('#file-browse');

    fileBrowse.click(function (e) {
      if (importBox) {
        importBox.click();
      }
      e.preventDefault();
    });

    importBox.change(function(e) {
      file = importBox[0].files[0];
      upload(file);
    });

  };

  function upload(file) {
    var formData = new FormData();
    formData.append('import_file', file);

    $.ajax({
      url: 'import/upload',
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        alert("File successfully uploaded");
      }, error: function(data){
        alert("Error uploading file");
      }
    });
  }

  function init() {
    uploadFile();
    dragFile();
  }

  app.nagual.importer = importer;

})(app);

$(function () {
  app.nagual.importer.init();
});
