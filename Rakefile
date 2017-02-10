require_relative 'config/application'

if ENV['RACK_ENV'] != 'production'
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new(:rubocop)
end

Rails.application.load_tasks

task build: [:rubocop, 'jasmine:ci']

task default: :build
