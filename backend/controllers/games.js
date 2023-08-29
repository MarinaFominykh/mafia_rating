const Game = require('../models/game');

// const InValidDataError = require('../errors/in-valid-data-err');
// const NotFoundError = require('../errors/not-found-err');

const createGame = (req, res, next) => {
  const {
    title,
    gameMaster,
    date,
    result,
    players,

  } = req.body;

  Game.create({
    title,
    gameMaster,
    date,
    result,
    players,
  })
    .then((match) => {
      res.send(match);
    })
    .catch((error) => {
      next(error);
    });
};

const createGames = (req, res, next) => {
  const array = req.body.filter((item) => item !== null);
  Game.insertMany(array)
    .then((games) => { res.send(games); })
    .catch((error) => {
      next(error);
    });
};

const updateGame = (req, res, next) => {
  const {

    title,
    gameMaster,
    date,
    players,
  } = req.body;
  // if (!gameMaster) {
  //   throw new InValidDataError('Переданы некорректные данныe');
  // }
  Game.findByIdAndUpdate(req.params.id, {
    title,
    gameMaster,
    date,
    players,
  }, {
    new: true,
  })
    .then((newMatch) => {
      res.send(newMatch);
    })
    .catch((error) => {
      next(error);
    });
};

const deleteGame = (req, res, next) => {
  Game.findByIdAndRemove(req.params.id)
    .then((game) => res.send({ data: game }))
    .catch((error) => {
      next(error);
    });
};

const getGames = (req, res, next) => {
  Game.find({})
    .populate({
      path: 'gameMaster',
      select: 'name',
    })
    .populate({
      path: 'players.user',
      select: 'name',
    })
    .then((matches) => res.send(matches))
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createGame,
  createGames,
  updateGame,
  deleteGame,
  getGames,

};
