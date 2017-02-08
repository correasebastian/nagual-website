require 'nagual/api'
require 'nagual/models/result'

class ImportJob < ApplicationJob
  queue_as :default

  def perform(*args)
    job_history = JobHistoryEntry.create
    result      = NAGUAL_API.import(args[0])

    NAGUAL_API.export unless result.status == 'error'

    job_history.update_from(result)
  end
end
