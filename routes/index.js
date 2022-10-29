const router = require('express').Router();

const usersRouter = require('./users');
const testsRouter = require('./tests');
const qustionsRouter = require('./qustions');


router.get('/', (req, res) => res.send('hello'));

router.use('/users', usersRouter);
router.use('/tests', testsRouter);
router.use('/qustions', qustionsRouter);

module.exports = router;