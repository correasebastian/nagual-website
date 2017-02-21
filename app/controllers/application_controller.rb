class ApplicationController < ActionController::Base

  before_action :authenticate_user!

  protect_from_forgery with: :exception

  def data
    filename = "#{params[:file]}.#{params[:format]}"

    send_file Rails.root.join('data', filename)
  end

end
