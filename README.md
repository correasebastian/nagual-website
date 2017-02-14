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

## How to run an import with file from remote SFTP location

You could run a task to pull a file and run import process instead of using the UI to upload it.

### Configuration

Make sure you have a .env file with the following variables:

```
RACK_ENV=production
NAGUAL_SFTP_HOST=example.host.com
NAGUAL_SFTP_USER=sftp_user
NAGUAL_SFTP_PASSWORD=sftp_password
NAGUAL_SFTP_FILE_PATTERN=MasterData_FULL*
NAGUAL_SFTP_REMOTE_PATH=Path/To/FolderWithFile
```

### How to run

Inside `nagual-web` directory:


```
bundle exec foreman run rake import:remote
```

A log file will be generated under `log/import_remote.log`
