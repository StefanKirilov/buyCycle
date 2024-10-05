const router = require('express').Router();

const userController = require('./controllers/userController');
const cycleController = require('./controllers/cycleController');

const commentController = require('./controllers/commentController');

router.use('/users', userController);
router.use('/cycles', cycleController);

router.use('/comments', commentController);

module.exports = router;