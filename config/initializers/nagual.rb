config = Psych.load_file('./config/input_output.yml')

Rails.application.config.nagual = config
