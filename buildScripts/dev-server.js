const express = require('express');
const path = require('path');
const open = require('open');
const webpack = require('webpack');
const getConfig = require('../webpack.config');

/* eslint-disable no-console */
const config = getConfig('dev');
const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../temp/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});