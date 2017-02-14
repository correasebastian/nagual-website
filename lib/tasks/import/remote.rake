namespace :import do
  desc 'Retrieve file from remote location and trigger import job'
  task remote: :environment do
    begin
      log = ActiveSupport::Logger.new('log/import_remote.log')

      log.info "Task started at #{Time.now}"

      host        = ENV['NAGUAL_SFTP_HOST']
      user        = ENV['NAGUAL_SFTP_USER']
      password    = ENV['NAGUAL_SFTP_PASSWORD']
      pattern     = ENV['NAGUAL_SFTP_FILE_PATTERN']
      remote_path = ENV['NAGUAL_SFTP_REMOTE_PATH']
      local_path  = NAGUAL_API.config['files']['input']['paths']['incoming']

      if host && user && password && pattern && remote_path && local_path
        file_name = SFTP::Download.new(host, user, password)
          .download_last(pattern, remote_path, local_path)

        log.info "File successfully downloaded from SFTP location: #{file_name}"

        ImportJob.perform_now file_name
        log.info "ImportJob triggered for #{file_name}"
      else
        log.error "Required configuration missing"
      end
    rescue Exception => e
      log.error "There was an unexpected error"
      log.error e.message
      log.debug e.backtrace.inspect
    ensure
      log.info "Task finished at #{Time.now}"

      log.close
    end
  end
end
