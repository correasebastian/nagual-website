class ImportController < ApplicationController

  before_filter :authenticate

  def index
    @history = JobHistoryEntry.last(5).reverse
  end

  def upload
    import_file = params[:import_file]

    return render status: 500, json: {error: 'File not provided'} if import_file.nil?

    logger.info(">>> Importing file: #{import_file}")
    csv_file = Rails.root.join('public', 'data', 'incoming', import_file.original_filename)

    File.open(csv_file, 'wb') do |f|
      f.write(import_file.read)
    end

    ImportJob.perform_later import_file.original_filename

    render status: 200, json: { sucess: true }

  end

  private

  def authenticate
    return unless Rails.env.production?

    authenticate_or_request_with_http_basic do |username, password|
      username == Rails.application.secrets.auth_user &&
        password == Rails.application.secrets.auth_password
    end
  end

end
