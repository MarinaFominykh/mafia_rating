export interface INewGame {
 
  title: string;
  gameMaster: string;
  date: string;
  result: string;
  players: PlayerForNewGame[];
 
}

export interface PlayerForNewGame {
  user: string;
  role: string;
  modKill?: boolean;
  bestPlayer?: boolean;
 
}
