import { IUser } from './IUser';

export interface IGame {
  _id: string;
  title: string;
  gameMaster: IUser;
  date: string;
  result: string;
  players: Player[];
 
}

export interface Player {
  user: IUser;
  role: string;
  modKill?: boolean;
  bestPlayer?: boolean;
 
}


