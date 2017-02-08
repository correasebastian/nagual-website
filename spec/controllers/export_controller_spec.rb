require 'zip'
require 'rails_helper'

RSpec.describe ExportController, type: :controller do
  describe 'GET #index' do
    let(:file) { fixture_file_upload('files/test.zip', 'application/zip') }
    let(:config) do
      { 'output' => { 'xml' => { 'path' => file.path } } }
    end

    before do
      stub_const('NAGUAL_API', instance_double(Nagual::API, config: config))
      allow(Zip::File).to receive(:open).with(anything, Zip::File::CREATE).and_return(file)

      get :index
    end

    it 'responds successfully with a file' do

      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response.headers['Content-Type']).to eq('application/octet-stream')
    end
  end
end
