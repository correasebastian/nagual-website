# Nagual website


## Webpack
we are using webpack to bundle the application with two different configuration
* 'dev' --> we can run  ``` npm run build:dev ```  the output folder is --> 'temp'
* 'prod' --> we can run   ``` npm run build ```  the output folder is --> 'dist'

## Dev Server
 * Using Express and webpack-dev-middleware --> ``` npm run dev:server ```

 ## Security
 * using nsp we can check vulnerabilites in npm packages --> ``` npm run security:check ```

 # set .editorcofig file
 it will help to keep consistency in our settings across the team

 * check all the plugins available for many editor and ide [editorconfig](http://editorconfig.org/#download) and install it, it will help to handle the ```.editorconfig ```  file
