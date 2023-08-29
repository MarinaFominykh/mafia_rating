import { IUser } from './IUser';

export interface IGame {
  _id: string;
  title: string;
  gameMaster: IUser;
  date: string;
  result: string;
  players: Player[];
  __v: number;
}

export interface Player {
  user: IUser;
  role: string;
  modKill: boolean;
  bestPlayer: boolean;
  _id: string;
}


