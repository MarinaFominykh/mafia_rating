export interface IDataUser {
  id: string;
  name: string;
  wins: number;
  games: number;
  best: number;
  rating: number;
  blackGames?: number;
  blackWins?: number;
  redGames?: number;
  redWins?: number;
  sheriffGames?: number;
  sheriffWins?: number;
  doneGames?: number;
  doneWins?: number;
  mk?: number;


}
