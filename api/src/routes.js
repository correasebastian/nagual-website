const Router = require('express').Router;
const router = new Router();

const contactUs = require('./model/contact-us/router');
const subscribe = require('./model/subscribe/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to ngl API!' });
});

router.use('/contact-us', contactUs);
router.use('/subscribe', subscribe);

module.exports = router;
