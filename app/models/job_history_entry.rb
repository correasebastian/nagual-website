class JobHistoryEntry < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?

  def set_defaults
    self.processed_file_path = ''
    self.report_file_path = ''
    self.processed_records = 0
    self.status ||= 'running'
  end

  def update_from(result)
    update(processed_file_path: strip_public_dir(result.processed_file),
           report_file_path: strip_public_dir(result.report_file),
           processed_records: result.processed_records, status: result.status)
  end

  private

  def strip_public_dir(path)
    path.split('/')[1..-1].join('/')
  end
end
