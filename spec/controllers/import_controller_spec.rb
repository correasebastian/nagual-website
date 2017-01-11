require 'rails_helper'

RSpec.describe ImportController, :type => :controller do


  describe "GET #index" do
    it "responds successfully with an HTTP 200 status code" do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #upload' do

    let(:file) { double('csvfile', :read => 'read') }

    it "responds successfully when  file is uploaded" do

      testfile = fixture_file_upload('files/test.csv', 'text/csv')

      expect(File).to receive(:open)

      post :upload, params: { import_file: testfile }

      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'Skips upload if filename is not provided' do
      post :upload

      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

  end

  describe 'GET #run' do
    it "runs import" do

      testfile = fixture_file_upload('files/test.csv', 'text/csv')

      expect_any_instance_of(Nagual::API).to receive(:import)

      get :run, params: { import_file: testfile }

      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

  end

end
