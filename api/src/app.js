const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cors = require('cors');


const config = require('./config');
const routes = require('./routes');

const app = express();


const corsOptions = {
  /*  origin: (origin, callback) => {
      if (config.cors.whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }*/
};


/* app.use((req, res, next) => {
  console.log('before helmet and body parser : this is the body', req.body);
  next();
});*/


app.use(helmet());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('tiny'));

app.use((req, res, next) => {
  console.log('after body parser');
  console.log('body', req.body);
  console.log('method', req.method);
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('something bad happen');
});

// app.options('*', cors(corsOptions))
app.use(cors(corsOptions));
app.use('/', routes);

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
