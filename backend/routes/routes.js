const router = require('express').Router();
const playerRouter = require('./players');
const gameRouter = require('./games');

router.use('/players', playerRouter);
router.use('/games', gameRouter);

module.exports = router;
