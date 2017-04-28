const dotenv = require('dotenv').config({
  silent: true
});

const stgVbles = require('./src/stage-variables');
/* ,
  path: '../'*/

console.log(dotenv);
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/app');
const server = awsServerlessExpress.createServer(app);


const handler = (event, context) => {
  // console.log(`Event: ${JSON.stringify(event)}`);
  stgVbles.setVariables(event.stageVariables);
  awsServerlessExpress.proxy(server, event, context);
};


exports.handler = handler;
