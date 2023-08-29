const {
  celebrate,
  Joi,
} = require('celebrate');

// POST /players
const validateCreatePlayer = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

// Patch /players/:id
const validateUpdatePlayer = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

// Delete /players/:id

const validateDeletePlayer = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

// POST /games
const validateCreateGame = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    gameMaster: Joi.string().length(24).hex().required(),
    date: Joi.string().required(),
    result: Joi.string().required(),
    players: Joi.array().length(10).required().items(Joi.object().keys({
      user: Joi.string().length(24).hex().required(),
      role: Joi.string().required(),
      modKill: Joi.string(),
      bestPlayer: Joi.string(),

    })),

  }),
});

// POST /games/array

const validateCreateGames = celebrate({
  body: Joi.array().required().items(
    Joi.object().keys({
      title: Joi.string().required(),
      gameMaster: Joi.string().length(24).hex().required(),
      date: Joi.string().required(),
      result: Joi.string().required(),
      players: Joi.array().length(10).required().items(Joi.object().keys({
        user: Joi.string().length(24).hex().required(),
        role: Joi.string().required(),
        modKill: Joi.string(),
        bestPlayer: Joi.string(),

      })),
    }),
  ),

});

// PUTCH /games/:id

const validateUpdateGame = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    gameMaster: Joi.string().length(24).hex().required(),
    date: Joi.string().required(),
    result: Joi.string().required(),
    players: Joi.array().length(10).required().items(Joi.object().keys({
      user: Joi.string().length(24).hex().required(),
      role: Joi.string().required(),
      modKill: Joi.string(),
      bestPlayer: Joi.string(),

    })),

  }),
});

// Delete /games/:id

const validateDeleteGame = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateCreatePlayer,
  validateUpdatePlayer,
  validateDeletePlayer,
  validateCreateGame,
  validateCreateGames,
  validateUpdateGame,
  validateDeleteGame,

};
