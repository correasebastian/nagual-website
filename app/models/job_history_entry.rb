class JobHistoryEntry < ApplicationRecord
  paginates_per 20

  after_initialize :set_defaults, unless: :persisted?

  def set_defaults
    self.processed_file_path = ''
    self.report_file_path = ''
    self.processed_records = 0
    self.status ||= 'running'
  end

  def update_from(result)
    update(processed_file_path: result.processed_file,
           report_file_path: result.report_file,
           processed_records: result.processed_records,
           status: result.status)
  end
end
