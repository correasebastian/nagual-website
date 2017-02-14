require 'rails_helper'

RSpec.describe SFTP do
  context '#download_last' do

    let(:file_name)  { 'MASTER_FULL_20170214.csv' }
    let(:pattern)    { 'MASTER_FULL*' }
    let(:connection) { double(:connection, dir: double(:dir)) }
    let(:file)       { double(:file, name: file_name) }

    before do
      allow(Net::SFTP).to receive(:start).and_yield(connection)
      allow(connection).to receive(:download!)
    end

    subject do
      sftp = described_class.new('host', 'user', 'password')
      sftp.download_last(pattern, 'remote', 'local')
    end

    context 'with at least one file found' do
      before do
        allow(connection.dir).to receive(:glob).with('remote', pattern)
          .and_return([file])

        subject
      end

      it 'starts connection correctly' do
        expect(Net::SFTP).to have_received(:start)
          .with('host', 'user', password: 'password')
      end

      it 'downloads file' do
        expect(connection).to have_received(:download!)
          .with("remote/#{file_name}", "local/#{file_name}")
      end
    end

    context 'with no files matching pattern' do
      before do
        allow(connection.dir).to receive(:glob).with('remote', pattern)
          .and_return([])
      end

      it 'raises an error' do
        expect { subject }.to raise_error('no file was found to be downloaded')
      end
    end
  end
end
