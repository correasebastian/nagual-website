require 'nagual/api'
require 'nagual/models/result'

class ImportJob < ApplicationJob
  include Nagual::Configuration

  queue_as :default

  def perform(*args)
    job_history = JobHistoryEntry.create

    config = load_config
    nagual = Nagual::API.new(config)
    result = nagual.import(args[0])

    job_history.update_from(result)
  end

end
