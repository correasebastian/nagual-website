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
            var percentString = percentComplete + '%';
            app.view.renderProgress(percentString);
            console.log('complete: ' + percentString);
          }
        }, false);
        return xhr;
      }
    });
    debugger;
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
}
app.controller = {
  init: function() {
    this.postUrl = 'import/upload';
    debugger;
    app.view.init();
  },
  upload: function(file) {
    if (!this.isValidFile(file)) {
      return;
    }
    var formData = app.helpers.buildFormData('import_file', file);

    app.view.beforeUpload();
    app.helpers.request('POST', this.postUrl, formData)
      .done(function(data) {
        app.view.renderUploadSuccess(file.name);
        setTimeout(app.helpers.reloadPage, 3000)
      })
      .fail(function(data) {
        app.view.renderUploadError(file.name);
      })
  },
  isValidFile: function(file) {
    var valid = false;
    if (!file) {
      console.error('file is null or undefined');
      return valid;
    }
    if (!file.name.endsWith('.csv')) {
      console.error('file:' + file.name + ' is not a cvs file, only csv files are valid');
      return valid;
    }
    return !valid;
  }

}

app.view = {
  init: function() {
    this.$importFileArea = $('#import-area');
    this.$inputFile = $('#import-file');
    this.$progressBar = $('#progress-bar');
    this.$importStatus = $("#importStatus");
    this.$headStatus = $("#head-status");
    this.$nameFile = $(".nameFile");
    this.aBrowseFile = $('#file-browse');
    this.$aShowImportArea = $('#show-import-area');
    this.$hideImportArea = $('#hide-import-zone');
    this.$uploadZone = $('#upload-zone');
    this.$historyZone = $('#history-zone');
    this.successImportClass='successImport';
    this.errorImportClass='errorImport';
    this.setAttributes();
    this.setListeners();
  },
  setAttributes: function() {
    this.$inputFile.attr('accept', '.csv')
  },
  setListeners: function() {
    this.$importFileArea.on('dragover dragenter', function(e) {
      e.preventDefault();
      e.stopPropagation();
      app.view.$importFileArea.addClass("upLoading");
    });
    this.$importFileArea.on('dragleave dragend drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.originalEvent.dataTransfer) {
        files = e.originalEvent.dataTransfer.files;
        app.view.$importFileArea.removeClass("upLoading");
        if (files.length) {
          var file = files[0];
          app.controller.upload(file);
        }
      }
    });

    this.aBrowseFile.click(function(e) {
      e.preventDefault();
      app.view.$inputFile.click();
    })

    this.$inputFile.change(function(e) {
      var file = app.view.$inputFile.get(0).files[0];
      app.controller.upload(file);
    })

    this.$aShowImportArea.click(function(e) {
      e.preventDefault();
      app.view.toggleUploadZone();

    });
    this.$hideImportArea.click(function(e){
      app.view.toggleUploadZone();
    })

  },
  renderProgress: function(percentString) {
    this.$progressBar.css('width', percentString).attr('aria-valuenow', percentString);
    this.$nameFile.text(percentString);
  },
  renderUploadSuccess: function(filename) {
    this.$inputFile.val('');
    this.$importStatus.addClass(this.successImportClass);
    this.renderUploadStatus('Loaded correctly', filename + ' was  uploaded, the page will be refreshed in 3 seconds ...');
  },
  renderUploadError: function(filename) {
    this.$inputFile.val('');
    this.$importStatus.addClass(this.errorImportClass);
    this.renderUploadStatus('Error uploading file', filename + ' was not  uploaded');
    this.$importFileArea.show();
  },

  renderUploadStatus: function(statusHeader, statusText) {
    this.$headStatus.text(statusHeader);
    this.$nameFile.text(statusText);
  },
  beforeUpload: function() {
    this.$importFileArea.hide();
    this.$importStatus.removeClass(this.successImportClass + ' ' + this.errorImportClass);
    this.renderUploadStatus('uploading ...', '')
    this.$importStatus.show();
  },
  toggleUploadZone: function() {
    this.$importStatus.hide();
    this.$uploadZone.toggleClass('hide');
    this.$aShowImportArea.toggleClass('hide');
  }

}
$(function() {
  app.controller.init();
});