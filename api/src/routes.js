const Router = require('express').Router;
const router = new Router();

const contactUs = require('./model/contact-us/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to ngl API!' });
});

router.use('/contact-us', contactUs);

module.exports = router;
