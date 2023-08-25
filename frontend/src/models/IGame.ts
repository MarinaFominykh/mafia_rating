export interface IGame {
  _id: string;
  title: string;
  gameMaster: GameMaster;
  date: string;
  result: string;
  players: Player[];
  __v: number;
}

export interface Player {
  player: GameMaster;
  role: string;
  modKill: boolean;
  bestPlayer: boolean;
  _id: string;
}

export interface GameMaster {
  _id: string;
  name: string;
}
