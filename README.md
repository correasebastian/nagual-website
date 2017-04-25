# Nagual website

## Frameworks
* [Bootstrap 4](https://v4-alpha.getbootstrap.com/)

## Webpack
we are using webpack to bundle the application with two different configuration
* 'dev' --> we can run  ``` npm run build:dev ```  the output folder is --> 'temp'
* 'prod' --> we can run   ``` npm run build ```  the output folder is --> 'dist'

## Dev Server
* Using Express and webpack-dev-middleware this run our code bundle from memory --> ``` npm run dev:server ```

 ## Security
* using nsp we can check vulnerabilites in npm packages --> ``` npm run security:check ```

## set .editorcofig file
it will help to keep consistency in our settings across the team

* check all the plugins available for many editor and ide [editorconfig](http://editorconfig.org/#download) and install it, it will help to handle the ```.editorconfig ```  file


## [Eslint](http://eslint.org/docs/user-guide/configuring)
it will help to keep consistency in our code across the team
* you can check your code running  --> ``` npm run lint ```


## Test
Using:
* [mocha](https://mochajs.org/) -> in order to be compatible with the latest es syntax we need to run mocha with this flag "--require babel-register", it will look for all the ``` ./src/**/*.spec.js  ```  files.
* [jsdom](https://github.com/tmpvar/jsdom) --> in memory Dom
* [chai](http://chaijs.com/) --> assertion library


## standarized Commits
in order to standarized commits we are using the npm package  [commitizen](https://www.npmjs.com/package/commitizen);
* from the command line add you changes as usual ``` git add <options> ```
* from the command line run ``` npm run cm ```


## Git Hooks
We are using the npm package [Husky](https://github.com/typicode/husky) to run the precommit and prepush hooks and run our lint and test taks

## Deploy - Staging

for the deploy we are using an npm task  --> ``` npm run deploy:staging ``` this task will be executed by the CI tool, in our case CircleCI,

behind the scene this command is doing :
* check linting
* running test
* build the app
* deploy to [surge](https://surge.sh/)  --> we need to follow this [guide](https://surge.sh/help/integrating-with-travis-ci) to set the environment variables iin circleCi to allow deploys in our behalf

## Deploy - Production

* create a new s3 Bucket
* convert the bucket to static website
* set a bucket policy , we have an example in ./aws/bucket-policy.json, (dont forget to change the bucket name  on the resource  ``` arn:aws:s3:::<your-bucket-name>/* ```)
* create a new user in aws console (circleCi need access to aws), create an access key and set in the circleCi project, [Example](https://circleci.com/docs/1.0/continuous-deployment-with-amazon-s3/)
* configure the circle.yml to set the folder you want to sync
* set an environment variable ``` AWS_BUCKET=<your bucket>  ```, example  ``` AWS_BUCKET=s3://nagual-website ```
