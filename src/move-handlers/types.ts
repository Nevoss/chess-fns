import type {BoardFile, BoardPosition, BoardRank} from '../types';

export type IncompleteMoveHandler = (
  [fileIndex, rankIndex]: [number, number],
  delta: number
) => [BoardFile | undefined, BoardRank | undefined];

export type MoveHandler = (
  [fileIndex, rankIndex]: [number, number],
  delta: number
) => BoardPosition | null;
