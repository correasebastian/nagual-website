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
            e.preventDefault();
            if (importBox) {
                importBox.click();
            }
        });
        importBox.change(function (e) {
            file = importBox[0].files[0];
            if (file.name.endsWith('.csv')) {
                upload(file);
            }
        });
    };
    $("#importStatus").hide();

    function upload(file) {
        var formData = new FormData();
        formData.append('import_file', file);
        $.ajax({
            url: 'import/upload'
            , data: formData
            , processData: false
            , contentType: false
            , type: 'POST'
            , success: function (data) {
                uploadFileSuccess(file);
            }
            , error: function (data) {
                uploadFileError(file);
            }
        });
    }

    function uploadFileSuccess(file) {
        $("#import-area").remove();
        $("#importStatus").show().addClass("successImport");
        $("#importStatus h2").text("Loaded correctly");
        $(".nameFile").text(file.name + ' was uploaded');
    }

    function uploadFileError(file) {
        $("#import-area").remove();
        $("#importStatus").show().addClass("errorImport");
        $("#importStatus h2").text("Error uploading file");
        $(".nameFile").text(file.name + ' was uploaded');
    }

    function importFile() {
        $.get("import/run?filename=" + file.name, function (data) {
            $("#import-area").remove();
            $("#importStatus").show().addClass("loadingImport");
            $("#importStatus h2").text("Loading file…");
            $(".nameFile").text(file.name + ' was uploaded');

        });
    }

    function addUploadFileErrorListener() {
        $('.import-area-error > .import-icon > .error').click(function () {
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