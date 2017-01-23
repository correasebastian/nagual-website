require 'rails_helper'

RSpec.describe JobHistoryEntry, type: :model do

  context 'create' do

    it 'creates an entry with default values' do
      job_history = described_class.create
      expect(job_history.status).to eq(described_class::RUNNING)
      expect(job_history.processed_records).to eq(0)
      expect(job_history.processed_file_path).to be_empty
      expect(job_history.report_file_path).to be_empty
    end

  end

  context 'update from result' do

    let(:result_params) do
      {
        processed_file: 'products.csv',
        report_file: 'report.txt',
        processed_records: 10,
        status: JobHistoryEntry::SUCCESS
      }
    end

    let(:update_params) do
      {
        processed_file_path: result.processed_file,
        report_file_path: result.report_file,
        processed_records: result.processed_records,
        status: result.status
      }
    end

    let(:result) { double('result', result_params) }

    it 'updates instance' do
      expect(subject).to receive(:update).with(update_params)
      subject.update_from(result)
    end

  end

end
