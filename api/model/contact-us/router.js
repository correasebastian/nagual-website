const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .post(controller.post);

module.exports = router;
