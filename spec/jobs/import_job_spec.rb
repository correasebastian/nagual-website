require 'rails_helper'

RSpec.describe ImportJob, type: :job do

  context 'import job' do

    let (:job_history) { double('job_history') }

    let(:result) { double('result') }

    it 'Performs an import process' do
      expect(JobHistoryEntry).to receive(:create).and_return(job_history)
      expect_any_instance_of(Nagual::API).to receive(:import)
        .with('file').and_return(result)
      expect(job_history).to receive(:update_from).with(result)

      subject.perform 'file'
    end

  end

end
