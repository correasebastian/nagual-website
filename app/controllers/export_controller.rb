require 'zip'

class ExportController < ApplicationController
  def index
    send_file export_zip
  end

  private

  def export_zip
    temp_file = Tempfile.new('catalog.zip')

    Zip::File.open(temp_file.path, Zip::File::CREATE) do |z|
      Dir["#{xml_export_path}/*"].each do |file|
        z.add file.split('/').last, file
      end
    end

    temp_file.path
  end

  def xml_export_path
    Rails.application.config.nagual['output']['path']
  end
end
