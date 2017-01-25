require 'nagual/api'

class ImportJob < ApplicationJob
  include Nagual::Configuration

  queue_as :default

  def perform(*args)

    config = load_config
    nagual = Nagual::API.new(config)
    nagual.import args[0]

  end
end
