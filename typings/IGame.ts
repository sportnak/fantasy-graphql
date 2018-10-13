export interface IGame {
  id: number;
  year: number;
  homeTeam: number;
  awayTeam: number;
  homeScore: number;
  awayScore: number;
  playoffGame: boolean;
  overtimeGame: boolean;
  date: string;
}