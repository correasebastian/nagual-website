# Nagual Web

Rails-web application for Nagual project

## How to release

* Make sure nagual-web is using latest version of nagual code: `bundle update nagual`
* Create a new 'release' tag in nagual-web repository
* SSH into the AWS production instance
* Sudo to become 'nagual' user:
  * `sudo -i`
  * `su - nagual`
* Pull latest code with:
  * `cd repo`
  * `git pull origin master`
  * `bundle install`
* Precompile assets
  * `bundle exec foreman run rake assets:precompile`

* Restart service as root:
  * `exit`
  * `service nagual restart`

## How to use alternate configuration

* Create a new folder with configuration files in the server (Ex. './config/client_x')
* Create an environment variable to use that configuration: `NAGUAL_CONFIG_FOLDER=./config/client_x`
* Restart the server and Nagual will use that new configuration.
* By default nagual-web will use `./config/default` folder to load configuration files
