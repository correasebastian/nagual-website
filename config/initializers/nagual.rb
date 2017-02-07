config = Psych.load_file('./config/files.yml')

Rails.application.config.nagual = config
