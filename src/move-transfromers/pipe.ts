import type {MoveTransformer, TransformersMove} from './types';
import type {GameState} from "../types";
import {getMainPiecePositionChange, getPieceById, isOnBoardPiece} from "../utils";

export default function pipe(transformers: MoveTransformer[]) {
  return (
    move: TransformersMove,
    gameState: GameState
  ): TransformersMove => {
    let result = move;

    const mainPiecePositionChange = getMainPiecePositionChange( move );
    const piece = getPieceById( gameState.pieces, mainPiecePositionChange.pieceId );

    if ( ! piece || ! isOnBoardPiece( piece ) ) {
      return result;
    }

    for (const transformer of transformers) {
      result = transformer(
        result,
        {
          gameState,
          piece,
          mainPiecePositionChange,
        }
      );

      if (result.blocking && result.invalid) {
        break;
      }
    }

    return result;
  };
}
