class CreateJobHistoryEntry < ActiveRecord::Migration[5.0]
  def change
    create_table :job_history_entries do |t|
      t.string :processed_file_path
      t.integer :processed_records
      t.string :status
      t.string :report_file_path

      t.timestamps
    end
  end
end
