const mongoose = require('mongoose');
const NotFoundError = require('../errors/not-found-err');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
});

playerSchema.statics.findUserByCredentials = function (name) {
  return this.findOne({ name }).then((user) => {
    if (!user) {
      throw new NotFoundError('Такой пользователь не найден');
    }
    return user;
  });
};

module.exports = mongoose.model('player', playerSchema);
