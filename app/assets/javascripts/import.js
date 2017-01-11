var app = {
  nagual: {}
};

(function(app) {

  var importer = {
    init: init
  };

  function initDragFile() {
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

  function initUploadFile() {
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
    $('#import-area').css("background-color", "white");
    $('#import-area').css("color", "#9B9B9B");

    var formData = new FormData();
    formData.append('import_file', file);

    $.ajax({
      url: 'import/upload',
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        $('#import-area > .copy').text('File was uploaded');
        $('#import-area > .import').show();
        $('#import-area > .import > .check').click(function() {
          alert("File will be imported");
        });
      }, error: function(data){
        $('#import-area > .copy').text('Error uploading file');
      }
    });
  }

  function init() {
    initUploadFile();
    initDragFile();
  }

  app.nagual.importer = importer;

})(app);

$(function () {
  app.nagual.importer.init();
});
