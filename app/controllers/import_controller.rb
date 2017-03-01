class ImportController < ApplicationController
  def index
    @history = JobHistoryEntry.order(created_at: :desc).page params[:page]
    @last_update = JobHistoryEntry.last.updated_at
  end

  def upload
    import_file = params[:import_file]

    return render status: 500, json: { error: 'File not provided' } if import_file.nil?

    logger.info(">>> Importing file: #{import_file}")
    csv_file = Rails.root.join('data', 'incoming', import_file.original_filename)

    File.open(csv_file, 'wb') do |f|
      f.write(import_file.read)
    end

    ImportJob.perform_later import_file.original_filename

    render status: 200, json: { sucess: true }
  end
end
