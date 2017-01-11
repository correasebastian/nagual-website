var app = {
    nagual: {}
};
(function (app) {
    var importer = {
        init: init
    };

    function initDragFile() {
        var importFileArea = $('#import-area');
        importFileArea.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        importFileArea.on('dragover dragenter', function (e) {
            e.preventDefault();
            e.stopPropagation();
            importFileArea.addClass("upLoading");
        });
        importFileArea.on('dragleave dragend drop', function (e) {
            if (e.originalEvent.dataTransfer) {
                files = e.originalEvent.dataTransfer.files;
                importFileArea.removeClass("upLoading");
                if (files.length) {
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
        importBox.change(function (e) {
            file = importBox[0].files[0];
            upload(file);
        });
    };
    $("#importStatus").hide();

    function upload(file) {
        var formData = new FormData();
        formData.append('import_file', file);
        //when the file is loading... 
        $("#importStatus").show().addClass("loadingImport");
        $("#import-area").remove();
        $("#importStatus h2").text("Loading file…");
        $.ajax({
            url: 'import/upload'
            , data: formData
            , processData: false
            , contentType: false
            , type: 'POST'
            , success: function (data) {
                //alert("File successfully uploaded");
                $("#importStatus").show().addClass("successImport");
                $("#importStatus h2").text("Loaded correctly");
            }
            , error: function (data) {
                //alert("Error uploading file");
                $("#importStatus").show().addClass("errorImport");
                $("#importStatus h2").text("Error uploading file");
                $("#importStatus p").text("Try again.");
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