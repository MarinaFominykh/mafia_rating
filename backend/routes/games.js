const router = require('express').Router();
const {
  createGame,
  createGames,
  updateGame,
  deleteGame,
  getGames,

} = require('../controllers/games');

const {
  validateCreateGame, validateCreateGames, validateUpdateGame, validateDeleteGame,
} = require('../middlewares/validations');

router.get('/', getGames);
router.post('/', validateCreateGame, createGame);
router.post('/array', validateCreateGames, createGames);
router.patch('/:id', validateUpdateGame, updateGame);
router.delete('/:id', validateDeleteGame, deleteGame);

module.exports = router;
