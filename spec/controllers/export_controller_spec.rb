require 'rails_helper'

RSpec.describe ExportController, type: :controller do
  describe 'GET #index' do

    it 'responds successfully with a file' do
      file = fixture_file_upload('files/test.csv', 'text/csv')
      expect(subject).to receive(:export_zip).and_return(file.path)

      get :index

      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response.headers['Content-Type']).to eq('application/octet-stream')
    end

  end
end
