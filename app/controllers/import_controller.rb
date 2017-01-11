require 'nagual/api'

class ImportController < ApplicationController
  include Nagual::Configuration

  def index

  end

  def upload
    filename = params[:import_file]

    File.open(Rails.root.join('data', 'incoming', filename.original_filename), 'wb') do |file|
      file.write(filename.read)
    end unless filename.to_s.empty?

    render json: { sucess: true }

  end

  def run
    filename = params[:filename]

    config = load_config
    nagual = Nagual::API.new(config)
    nagual.import filename

    render json: { sucess: true }
  end

end
