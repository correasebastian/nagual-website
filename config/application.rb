require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module NagualWeb
  class Application < Rails::Application

    config.generators do |g|
        g.javascript_engine :js
    end

  end
end
