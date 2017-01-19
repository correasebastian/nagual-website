require 'rails_helper'

RSpec.describe ImportJob, type: :job do

  context 'import job' do

    it 'Runs an import process' do
      expect_any_instance_of(Nagual::API).to receive(:import).with('file')

      subject.perform 'file'
    end

  end

end
