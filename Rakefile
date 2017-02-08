require_relative 'config/application'
require 'rspec/core/rake_task'
require 'rubocop/rake_task'

Rails.application.load_tasks

RSpec::Core::RakeTask.new(:spec)

RuboCop::RakeTask.new(:rubocop)

task build: [:rubocop, :spec]

task default: :build
