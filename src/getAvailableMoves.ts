import type {BoardPosition, GameState, Move, OnBoardPiece, Piece, PieceColor, PieceId, PieceType} from './types';
import type {MoveHandler} from "./move-handlers";
import type {MoveTransformer} from "./move-transfromers";
import getBoardPositionIndexes, {getPieceByPosition, isBoardPosition, isOnBoardPiece, isPieceColor} from "./utils";
import {handlers} from "./move-handlers";
import {pipeMoveTransformers, transformers} from "./move-transfromers";

const piecesMoveOptions: Record<PieceType,
  { maxSteps: number; handlers: MoveHandler[]; transformers: MoveTransformer[] }> = {
  king: {
    maxSteps: 2, // When castling, the king can move 2 steps.
    handlers: [
      handlers.toTop,
      handlers.toBottom,
      handlers.toRight,
      handlers.toLeft,
      handlers.toTopLeft,
      handlers.toTopRight,
      handlers.toBottomLeft,
      handlers.toBottomRight,
    ],
    transformers: [transformers.friendlyPieceTransformer, transformers.opponentPieceTransformer],
  },
  queen: {
    maxSteps: 7,
    handlers: [
      handlers.toTop,
      handlers.toBottom,
      handlers.toRight,
      handlers.toLeft,
      handlers.toTopLeft,
      handlers.toTopRight,
      handlers.toBottomLeft,
      handlers.toBottomRight,
    ],
    transformers: [transformers.friendlyPieceTransformer, transformers.opponentPieceTransformer],
  },
  bishop: {
    maxSteps: 7,
    handlers: [handlers.toTopLeft, handlers.toTopRight, handlers.toBottomLeft, handlers.toBottomRight],
    transformers: [transformers.friendlyPieceTransformer, transformers.opponentPieceTransformer],
  },
  knight: {
    maxSteps: 1,
    handlers: [
      handlers.knightToTopLeft,
      handlers.knightToBottomLeft,
      handlers.knightToTopRight,
      handlers.knightToBottomRight,
      handlers.knightToLeftTop,
      handlers.knightToLeftBottom,
      handlers.knightToRightTop,
      handlers.knightToRightBottom,
    ],
    transformers: [transformers.friendlyPieceTransformer, transformers.opponentPieceTransformer],
  },
  rook: {
    maxSteps: 7,
    handlers: [handlers.toTop, handlers.toBottom, handlers.toRight, handlers.toLeft],
    transformers: [transformers.friendlyPieceTransformer, transformers.opponentPieceTransformer],
  },
  pawn: {
    maxSteps: 2, // When the pawn has not moved, it can move 2 steps.
    handlers: [handlers.toTop, handlers.toBottom, handlers.toTopLeft, handlers.toTopRight, handlers.toBottomLeft, handlers.toBottomRight],
    transformers: [
      transformers.pawnColorDirectionTransformer,
      transformers.pawnFirstMoveTransformer,
      transformers.pawnStraightMoveTransformer,
      transformers.pawnDiagonalMoveTransformer,
    ],
  },
};

export default function getAvailableMoves(gameState: GameState): { pieceId: Piece, moves: Move[] }[];
export default function getAvailableMoves(gameState: GameState, pieceColor: PieceColor): { pieceId: Piece, moves: Move[] };
export default function getAvailableMoves(gameState: GameState, pieceId: PieceId): Move[];
export default function getAvailableMoves(gameState: GameState, position: BoardPosition): Move[];
export default function getAvailableMoves(gameState: GameState, subject?: PieceColor | BoardPosition | PieceId): any {
  const pieces: OnBoardPiece[] = gameState.pieces.filter(isOnBoardPiece);

  if (!subject) {
    return pieces.map(piece => ({pieceId: piece.id, moves: getAvailableMoves(gameState, piece.id)}));
  }

  if (isPieceColor(subject)) {
    return pieces
      .filter(piece => piece.color === subject)
      .map(piece => ({pieceId: piece.id, moves: getAvailableMoves(gameState, piece.id)}));
  }

  if (isBoardPosition(subject)) {
    const piece = getPieceByPosition(pieces, subject);

    if (!piece) {
      return [];
    }
    return getAvailableMoves(gameState, piece.id);
  }

  const piece = pieces.find(piece => piece.id === subject);

  if (!piece) {
    return [];
  }

  const {maxSteps, handlers, transformers} = piecesMoveOptions[piece.type];
  const [fileIndex, rankIndex] = getBoardPositionIndexes(piece.position);

  const moves: Move[] = [];
  let currentHandlers = new Set<MoveHandler>([...handlers]);

  // Run over the steps that the piece can make.
  for (let i = 0; i < maxSteps; i++) {
    // Run over the possible moves that the piece can make.
    for (const handler of currentHandlers) {
      const to = handler([fileIndex, rankIndex], i + 1);

      if (!to) {
        currentHandlers.delete(handler);

        continue;
      }

      const {invalid, blocking, ...move} = pipeMoveTransformers(transformers)(
        {
          invalid: false,
          blocking: false,
          changes: {
            piecePositions: [{pieceId: piece.id, from: piece.position, to}]
          },
        },
        gameState
      );

      if (blocking) {
        currentHandlers.delete(handler);
      }

      if (invalid) {
        continue;
      }

      moves.push(move);
    }

    if (currentHandlers.size === 0) {
      break;
    }
  }

  return moves;
}
