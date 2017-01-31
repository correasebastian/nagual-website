require 'rails_helper'

RSpec.describe JobHistoryEntry, type: :model do
  context 'create' do
    it 'creates an entry with default values' do
      job_history = described_class.create
      expect(job_history.status).to eq('running')
      expect(job_history.processed_records).to eq(0)
      expect(job_history.processed_file_path).to be_empty
      expect(job_history.report_file_path).to be_empty
    end
  end

  context 'update from result' do
    let(:result_params) do
      {
        processed_file: 'public/data/archive/products.csv',
        report_file: 'public/data/error/report.txt',
        processed_records: 10,
        status: 'success'
      }
    end

    let(:update_params) do
      {
        processed_file_path: 'data/archive/products.csv',
        report_file_path: 'data/error/report.txt',
        processed_records: 10,
        status: 'success'
      }
    end

    let(:result) { double('result', result_params) }

    it 'updates instance' do
      expect(subject).to receive(:update).with(update_params)
      subject.update_from(result)
    end
  end
end
