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

        name = last_file.name
        sftp.download!("#{remote_path}/#{name}",
                       "#{local_path}/#{name}")

        return name
      end
    rescue Net::SFTP::StatusException
      raise MissingFileError
    rescue Net::SSH::ConnectionTimeout
      raise ConnectionError
    end

  end
end
