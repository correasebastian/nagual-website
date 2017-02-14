config_folder = 'default' || ENV['NAGUAL_CONFIG_FOLDER']
NAGUAL_API = Nagual::API.new(Rails.root.join('config', 'nagual', config_folder).to_s)
