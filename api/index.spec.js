const lambdaHandler = require('./index.js').handler;


/* the header has to have "Content-Type": "application/json", or application/x-www-form-urlencoded , is the only way the bodyparser can handle that*/
const mockEvent = require('./test-event.json');
lambdaHandler(mockEvent, {});
