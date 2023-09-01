import {
  RED_RESULT,
  BLACK_RESULT,
  RED,
  BLACK,
  DONE,
  SHERIFF,
  BEST_PLAYER,
  MODKILL,
} from './constans';
export function countGames(games, user) {
  // console.log('array', games)
  return games?.filter((game) => {
    return game.players.some((player) => player?.user?._id === user._id);
  }).length;
}

export function countWin(games, user, role, result) {
  return games?.filter((game) => {
    return game.players.some(
      (player) =>
        player?.user?._id === user._id &&
        player?.role === role &&
        game.result === result
    );
  }).length;
}

export const mafiaWin = (games, user) => {
  return countWin(games, user, BLACK, BLACK_RESULT);
};

export const doneWin = (games, user) => {
  return countWin(games, user, DONE, BLACK_RESULT);
};

export const blackWin = (games, user) => {
  return mafiaWin(games, user) + doneWin(games, user);
};

export const peaceWin = (games, user) => {
  return countWin(games, user, RED, RED_RESULT);
};

export const sheriffWin = (games, user) => {
  return countWin(games, user, SHERIFF, RED_RESULT);
};

export const redWin = (games, user) => {
  return peaceWin(games, user) + sheriffWin(games, user);
};

export const totalWin = (games, user) => {
  return blackWin(games, user) + redWin(games, user);
};

export function countProps(games, user, key) {
  return games?.filter((game) => {
    return game.players.some(
      (player) => player?.user?._id === user._id && player?.[key]
    );
  }).length;
}

export const bestPlayer = (games, user) => {
  return countProps(games, user, BEST_PLAYER);
};

export const modKill = (games, user) => {
  return countProps(games, user, MODKILL);
};

export const rating = (games, user) => {
  let rating = 0;
  const blackVictory = mafiaWin(games, user);
  const blackLoose = countWin(games, user, BLACK, RED_RESULT);
  const redVictory = peaceWin(games, user);
  const sheriffVictory = sheriffWin(games, user);
  const sheriffLoose = countWin(games, user, SHERIFF, BLACK_RESULT);
  const doneVictory = doneWin(games, user);
  const doneLoose = countWin(games, user, DONE, RED_RESULT);
  const best = bestPlayer(games, user);
  const mk = modKill(games, user);

  rating =
    blackVictory * 4 +
    blackLoose * -0.5 +
    redVictory * 3 +
    sheriffVictory * 5 +
    sheriffLoose * -1 +
    doneVictory * 4 +
    doneLoose * -0.5 +
    best * 2 +
    mk * -4;

  return rating;
};

export function filterResult(games, result) {
  return games?.filter((game) => {
    return game.result === result;
  }).length;
}

export function openPopup(setState) {
  setState(true);
}

export function closePopup(setState) {
  setState(false);
}

export const optionsUser = (users) => {
    return users?.map((user) => {
        return {
            value: user._id,
            label: user.name
        };
    });
}
