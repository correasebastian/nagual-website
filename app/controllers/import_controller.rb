class ImportController < ApplicationController

  def index

  end

  def upload
    filename = params[:import_file]
    puts filename
    File.open(Rails.root.join('data', 'incoming', filename.original_filename), 'wb') do |file|
      file.write(filename.read)
    end unless filename.to_s.empty?
  end

end
