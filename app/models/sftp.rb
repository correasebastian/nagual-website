require 'net/sftp'

class SFTP

  def initialize(host, user, password)
    @host     = host
    @user     = user
    @password = password
  end

  def download_last(file_pattern, remote_path, local_path)
    Net::SFTP.start(@host, @user, password: @password) do |sftp|
      last_file = sftp.dir.glob(remote_path, file_pattern).last

      raise 'no file was found to be downloaded' if last_file.nil?

      sftp.download!("#{remote_path}/#{last_file.name}",
                     "#{local_path}/#{last_file.name}")
    end
  end

end
