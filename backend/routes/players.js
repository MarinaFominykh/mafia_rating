const router = require('express').Router();
const {
  createPlayer,
  createPlayers,
  updatePlayer,
  getPlayers,
  getPlayer,
  deletePlayer,

} = require('../controllers/players');
const { validateCreatePlayer, validateUpdatePlayer, validateDeletePlayer } = require('../middlewares/validations');

router.get('/', getPlayers);
router.get('/:id', getPlayer);
router.post('/', validateCreatePlayer, createPlayer);
router.post('/array', createPlayers);
router.patch('/:id', validateUpdatePlayer, updatePlayer);
router.delete('/:id', validateDeletePlayer, deletePlayer);

module.exports = router;
