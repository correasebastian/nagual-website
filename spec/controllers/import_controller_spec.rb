require 'rails_helper'

RSpec.describe ImportController, type: :controller do

  before { sign_in }

  describe 'GET #index' do

    let(:entry) { double('entry', updated_at: DateTime.now) }

    it 'responds successfully' do
      expect(JobHistoryEntry).to receive_message_chain(:order, :page)
      expect(JobHistoryEntry).to receive(:last).and_return(entry)

      get :index

      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #upload' do
    let(:file) { fixture_file_upload('files/test.csv', 'text/csv') }

    it 'responds successfully when  file is uploaded' do
      expect(ImportJob).to receive(:perform_later)

      post :upload, params: { import_file: file }

      expect(response).to have_http_status(200)
    end

    it 'Skips upload if filename is not provided' do
      post :upload

      expect(response).to have_http_status(500)
      expect(response).not_to be_success
    end
  end
end
