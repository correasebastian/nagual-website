var app = {};

app.helpers = {
  request: function(method, url, data) {
    var ajaxcall = $.ajax({
      url: url,
      data: data,
      processData: false,
      contentType: false,
      type: method,
      xhr: function() {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {

          if (evt.lengthComputable) {
            var percentComplete = Math.ceil((evt.loaded / evt.total) * 100);
            var percentString = percentComplete + "%";
            app.view.renderProgress(percentString);
          }
        }, false);
        return xhr;
      }
    });
    return ajaxcall;
  },
  buildFormData: function(name, data) {
    var formData = new FormData();
    formData.append(name, data);
    return formData;
  },
  reloadPage: function() {
    window.location.reload();
  }
};

app.controller = {
  init: function() {
    this.postUrl = "import/upload";
    app.view.init();
  },
  upload: function(file) {
    if (!this.isValidFile(file)) {
      return;
    }
    var formData = app.helpers.buildFormData("import_file", file);

    app.view.beforeUpload();
    app.helpers.request("POST", this.postUrl, formData)
      .done(function() {
        app.view.renderUploadSuccess(file.name);
        window.setTimeout(function() {
          app.helpers.reloadPage();
        }, 3000);
      })
      .fail(function() {
        app.view.renderUploadError(file.name);
      });
  },
  isValidFile: function(file) {
    var valid = false;
    if (!file) {
      return valid;
    }
    if (!file.name.endsWith(".csv")) {
      return valid;
    }
    return !valid;
  }

};

app.view = {
  init: function() {
    this.$home = $(".home");
    this.$uploadZone = $("#upload-zone");
    this.$importFileArea = $("#import-area");
    this.$inputFile = $("#import-file");
    this.$importStatus = $("#importStatus");
    this.$headStatus = $("#head-status");
    this.$errorIcon = $("#error-icon");
    this.$successIcon = $("#success-icon");
    this.$progressBar = $("#progress-bar");
    this.$nameFile = $(".nameFile");
    this.aBrowseFile = $("#file-browse");
    this.$hideImportArea = $("#hide-import-zone");
    this.$historyZone = $("#history-zone");
    this.$aShowImportArea = $("#show-import-area");
    this.$errorReportModal = $("#error-report-modal");
    this.$errorReportIcon = $(".error-report-icon");
    this.successImportClass = "successImport";
    this.errorImportClass = "errorImport";
    this.setAttributes();
    this.setListeners();
  },
  setAttributes: function() {
    this.$inputFile.attr("accept", ".csv");
  },
  setListeners: function() {
    this.$importFileArea.on("dragover dragenter", function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$importFileArea.addClass("upLoading");
    }.bind(this));

    this.$importFileArea.on("dragleave dragend drop", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.originalEvent.dataTransfer) {
        var files = e.originalEvent.dataTransfer.files;
        this.$importFileArea.removeClass("upLoading");
        if (files.length) {
          var file = files[0];
          app.controller.upload(file);
        }
      }
    }.bind(this));

    this.aBrowseFile.click(function(e) {
      e.preventDefault();
      this.$inputFile.click();
    }.bind(this));

    this.$inputFile.change(function() {
      var file = this.$inputFile.get(0).files[0];
      app.controller.upload(file);
    }.bind(this));

    this.$aShowImportArea.click(function(e) {
      e.preventDefault();
      this.toggleUploadZone();

    }.bind(this));

    this.$hideImportArea.click(function() {
      this.toggleUploadZone();
    }.bind(this));

    this.$errorIcon.click(function() {
      this.$errorIcon.hide();
      this.$importStatus.hide();
      this.$importFileArea.show();
      this.renderProgress("0%");

    }.bind(this));

    this.$errorReportIcon.bind("click", function(e) {
      e.preventDefault();
      var url = e.currentTarget.dataset.url;
      app.helpers.request("GET", url)
        .done(function(data) {
          $("#modal-body > .modal-body-content").text(data);
        })
        .fail(function() {
          $("#modal-body > .modal-body-content").text("Unable to load report");
        });
      this.$errorReportModal.modal();
    }.bind(this));

  },
  renderProgress: function(percentString) {
    this.$progressBar.css("width", percentString);
    this.$progressBar.attr("aria-valuenow", percentString);
    this.$nameFile.text(percentString);
  },
  renderUploadSuccess: function(filename) {
    this.$inputFile.val("");
    this.$importStatus.addClass(this.successImportClass);
    this.$successIcon.show();
    this.renderUploadStatus("Loaded correctly", filename + " was  uploaded, the page will be refreshed in 3 seconds ...");
  },
  renderUploadError: function(filename) {
    this.$inputFile.val("");
    this.$importStatus.addClass(this.errorImportClass);
    this.renderUploadStatus("Error uploading file, try again", filename + " was not  uploaded");
    this.$errorIcon.show();
  },

  renderUploadStatus: function(statusHeader, statusText) {
    this.$headStatus.text(statusHeader);
    this.$nameFile.text(statusText);
  },
  beforeUpload: function() {
    this.$importFileArea.hide();
    this.$importStatus.removeClass(this.successImportClass + " " + this.errorImportClass);
    this.renderUploadStatus("uploading ...", "");
    this.$importStatus.show();
  },
  toggleUploadZone: function() {
    this.$importStatus.hide();
    this.$uploadZone.toggleClass("hide");
    this.$aShowImportArea.toggleClass("hide");
    this.$home.toggleClass("flex flex-col flex-center");
  }

};

$(function() {
  app.controller.init();
});
