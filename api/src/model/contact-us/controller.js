const util = require('util');
// const rp = require('request-promise-native');
const stgVbls = require('../../stage-variables');

function onPost(req, res, next) {
  /* req.checkBody('email_address', 'must include email property').notEmpty();
  req.checkBody('email_address', 'Is not a valid email').isEmail();*/
  return req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        console.log(`There have been validation errors:  ${util.inspect(result.array())}`);
        res.status(400).json({
          errors: result.useFirstErrorOnly().array() // result.array()
        });
        return;
      }

      const response = Object.assign({}, req.body, stgVbls.getStageVariables(), {
        // timestamp: '529'
      });

      res.status(201)
        .json(response);
      /*      const options = {
              method: 'POST',
              uri: `https://us1.api.mailchimp.com/3.0/lists/${config.mailchimp.list}/members`,
              body: {
                email_address: req.body.email_address,
                status: 'subscribed'
              },
              headers:{
                Authorization: `apikey ${config.mailchimp.apiKey}`
              },
              json: true // Automatically stringifies the body to JSON
            };

            rp(options)
              .then((parsedBody) => {
                // POST succeeded...
                res.status(201).json(parsedBody);
              })
              .catch((err) => {
                // console.log('error', err);
                // POST failed...
                res.status(err.statusCode).json(err.error);
              });*/

    });
}

exports.post = onPost;
