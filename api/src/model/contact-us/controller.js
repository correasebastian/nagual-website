const util = require('util');

function onPost(req, res, next) {
  req.checkBody('email', 'must include email property').notEmpty();
  req.checkBody('email', 'Is not a valid email').isEmail();
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        console.log(`There have been validation errors:  ${util.inspect(result.array())}`);
        res.status(400).json({
          errors: result.useFirstErrorOnly().array() // result.array()
        });
        return;
      }
      res.status(201).json(req.body);
    });
}

exports.post = onPost;
