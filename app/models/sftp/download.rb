require 'net/sftp'

module SFTP

  class ConnectionError < StandardError; end
  class MissingFileError < StandardError; end

  class Download

    def initialize(host, user, password)
      @host     = host
      @user     = user
      @password = password
    end

    def download_last(file_pattern, remote_path, local_path)
      Net::SFTP.start(@host, @user, password: @password) do |sftp|
        last_file = sftp.dir.glob(remote_path, file_pattern).last

        raise MissingFileError if last_file.nil?

        sftp.download!("#{remote_path}/#{last_file.name}",
                       "#{local_path}/#{last_file.name}")
      end
    rescue Net::SSH::ConnectionTimeout
      raise ConnectionError
    end

  end
end
