# Nagual Web

Rails-web application for Nagual project


## How to release


* Make sure nagual-web is using latest version of nagual code: `bundle update nagual`
* Create a new 'release' tag in nagual-web repository
* SSH into the AWS production instance and pull latest code with:
    * `git pull origin master`
    * `bundle update`
* Restart service as root: `service nagual restart`

