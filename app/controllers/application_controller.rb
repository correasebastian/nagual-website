class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate

  def data
    filename = "#{params[:file]}.#{params[:format]}"

    send_file Rails.root.join('data', filename)
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
