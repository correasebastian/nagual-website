require 'rails_helper'

RSpec.describe ImportJob, type: :job do
  context 'import job' do
    let(:job_history) { instance_double(JobHistoryEntry) }
    let(:result)      { instance_double(Nagual::Models::Result, status: 'success') }
    let(:nagual_api)  { instance_double(Nagual::API) }

    before do
      stub_const('NAGUAL_API', nagual_api)
      allow(JobHistoryEntry).to receive(:create).and_return(job_history)

      allow(nagual_api).to receive(:import).with('file').and_return(result)
      allow(nagual_api).to receive(:export)
      allow(job_history).to receive(:update_from)

      subject.perform 'file'
    end

    it 'creates an empty job history entry' do
      expect(JobHistoryEntry).to have_received(:create).with(no_args)
    end

    it 'updates job history with result' do
      expect(job_history).to have_received(:update_from).with(result)
    end

    it 'triggers export' do
      expect(nagual_api).to have_received(:export)
    end

    context 'with error result' do
      let(:result) { instance_double(Nagual::Models::Result, status: 'error') }

      it 'skips export' do
        expect(nagual_api).not_to have_received(:export)
      end
    end
  end
end
