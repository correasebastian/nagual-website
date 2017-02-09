require_relative 'config/application'
require 'rubocop/rake_task'

Rails.application.load_tasks

RuboCop::RakeTask.new(:rubocop)

task build: [:rubocop, 'jasmine:ci']

task default: :build
