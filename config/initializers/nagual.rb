config_folder = ENV['NAGUAL_CONFIG_FOLDER'] || 'default'
NAGUAL_API = Nagual::API.new(Rails.root.join('config', 'nagual', config_folder).to_s)
