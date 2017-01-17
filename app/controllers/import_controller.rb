
class ImportController < ApplicationController

  def index
    @history = JobHistoryEntry.last(5)
  end

  def upload
    import_file = params[:import_file]

    return render status: 500, json: {error: 'File not provided'} if import_file.nil?

    File.open(Rails.root.join('data', 'incoming', import_file.original_filename), 'wb') do |f|
      f.write(import_file.read)
    end

    render status: 200, json: { sucess: true }

  end

  def run
    filename = params[:filename]

    ImportJob.perform_later filename


    render json: { sucess: true }
  end

end
