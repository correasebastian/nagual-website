require 'nagual/api'
require 'nagual/models/result'

class ImportJob < ApplicationJob
  include Nagual::Configuration

  queue_as :default

  def perform(*args)

    config = load_config
    nagual = Nagual::API.new(config)
    result = nagual.import(args[0])
    logger.error(">>> Ending perform: #{result.inspect}")
  end

  after_perform do |job|
    logger.error(">>> After perform: #{job.inspect}")
  end

end
