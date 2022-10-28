import type {GameState, Move, OnBoardPiece, PieceMainPositionChange} from '../types';

export interface TransformersMove extends Move {
  invalid: boolean;
  blocking: boolean;
}

export type MoveTransformer = (
  move: TransformersMove,
  context: {
    gameState: GameState;
    piece: OnBoardPiece;
    mainPiecePositionChange: PieceMainPositionChange;
  }
) => TransformersMove;
