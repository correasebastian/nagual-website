class ExportController < ApplicationController
  def index
    send_file export_zip
  end

  private

  def export_zip
  end
end
