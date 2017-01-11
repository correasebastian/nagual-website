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

    var formData = new FormData();
    formData.append('import_file', file);

    $.ajax({
      url: 'import/upload',
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        uploadFileSuccess(file);
      }, error: function(data){
        $('.import-area-browse').hide();
        $('.import-area-error').show();
      }
    });
  }

  function uploadFileSuccess(file){
    $('.import-area-browse').hide();
    $('.import-area-success > .copy').text(file.name + ' was uploaded');
    $('.import-area-success').show();
    $('.import-area-success > .import-icon > .check').click(function() {
      importFile(file);
    });
  }

  function uploadFileError(file) {
    $('.import-area-browse').hide();
    $('.import-area-error > .copy').text('Error uploading file ' + file.name);
    $('.import-area-error').show();
  }

  function importFile(){
    $.get("import/run?filename=" + file.name, function(data) {
      $('.import-area-success').hide();
      $('.import-area-browse').show();
    });
  }

  function addUploadFileErrorListener() {
    $('.import-area-error > .import-icon > .error').click(function() {
      $('.import-area-browse').show();
      $('.import-area-error').hide();
    });
  }

  function init() {
    initUploadFile();
    initDragFile();
    addUploadFileErrorListener();
  }

  app.nagual.importer = importer;

})(app);

$(function () {
  app.nagual.importer.init();
});
