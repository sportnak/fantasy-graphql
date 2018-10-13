export interface IGameStats {
  id: number;
  playerId?: number;
  teamId: number;
  gameId: number;
  passingYards: number;
  receivingYards: number;
  rushingYards: number;
  fumbles: number;
  fumbleRec: number;
  completions: number;
  attempts: number;
  passingTds: number;
  rushingTds: number;
  qbr: number;
  interceptions: number;
  picksThrown: number;
  passingLong: number;
  rushingLong: number;
  sacked: number;
  started: boolean;
  win: boolean;
  winningDrive: number;
}