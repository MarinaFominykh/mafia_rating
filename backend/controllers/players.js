const Player = require('../models/player');
// const InValidDataError = require('../errors/in-valid-data-err');
const EmailDuplicateError = require('../errors/email-duplicate-err');
const NotFoundError = require('../errors/not-found-err');

const createPlayer = (req, res, next) => {
  const { name } = req.body;
  Player.create({ name })
    .then((unit) => {
      res.send(unit);
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new EmailDuplicateError('Пользователь с таким ником уже существует'));
      }
      return next(error);
    });
};

const createPlayers = (req, res, next) => {
  const array = req.body.filter((item) => item !== null);
  Player.insertMany(array)
    .then((units) => { res.send(units); })
    .catch((error) => {
      if (error.code === 11000) {
        next(new EmailDuplicateError(`Пользователь с ником ${error.message.slice((error.message.indexOf('name:')) + 6)}уже существует`));
      } return next(error);
    });
};

const updatePlayer = (req, res, next) => {
  const { name } = req.body;
  Player.findByIdAndUpdate(req.params.id, { name }, { new: true })
    .then((newData) => res.send(newData))
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailDuplicateError(`Пользователь с ником ${err.keyValue.name} уже существует`));
      } else { next(err); }
    })
    .catch(next);
};

const getPlayers = (req, res, next) => {
  Player.find({})
    .then((units) => res.send(units))
    .catch(next);
};

const getPlayer = (req, res, next) => {
  Player.findById(req.params.id)
    .then((unit) => {
      if (!unit) {
        throw new NotFoundError('Такой игрок не найден');
      }
      res.send({ data: unit });
    })
    .catch(next);
};

const deletePlayer = (req, res, next) => {
  Player.findByIdAndRemove(req.params.id)
    .then((player) => res.send({ data: player }))
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createPlayer,
  createPlayers,
  updatePlayer,
  getPlayers,
  getPlayer,
  deletePlayer,

};
