require 'rails_helper'

RSpec.describe ImportController, :type => :controller do

  describe "GET #index" do
    it "responds successfully" do
      expect(JobHistoryEntry).to receive(:last).with(5)

      get :index

      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #upload' do

    let(:file) { double('csvfile', :read => 'read') }

    xit "responds successfully when  file is uploaded" do

      testfile = fixture_file_upload('files/test.csv', 'text/csv')

      allow(File).to receive(:open).and_yield file
      expect(file).to receive(:write)

      expect(ImportJob).to receive(:perform_later)

      post :upload, import_file: testfile

      expect(response).to have_http_status(200)
    end

    it 'Skips upload if filename is not provided' do
      post :upload

      expect(response).to have_http_status(500)
      expect(response).not_to be_success
    end

  end

end
