const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  gameMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'player',
    required: true,
  },
  date: {
    type: Date,
    // required: true,
    default: Date.now(),
  },
  result: {
    type: String,
    required: true,
    enum: ['Победа города', 'Победа мафии', 'Ничья'],
  },

  players: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'player',
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['мирный', 'мафия', 'дон', 'шериф'],
    },
    modKill: {
      type: Boolean,
      default: false,
    },
    bestPlayer: {
      type: Boolean,
      default: false,
    },
  }],
});

module.exports = mongoose.model('game', gameSchema);
