import type {MoveTransformer, TransformersMove} from './types';
import {getPieceByPosition, getBoardPositionDelta, toBoardPositionTuple} from '../utils';

export const friendlyPieceTransformer: MoveTransformer = (move, {piece, mainPiecePositionChange, gameState}) => {
  const {to} = mainPiecePositionChange;
  const pieceAtTo = getPieceByPosition(gameState.pieces, to);

  if (pieceAtTo && pieceAtTo.color === piece.color) {
    return {...move, invalid: true, blocking: true};
  }

  return move;
};

export const opponentPieceTransformer: MoveTransformer = (move, {piece, mainPiecePositionChange, gameState}) => {
  const {to} = mainPiecePositionChange;
  const targetPiece = getPieceByPosition(gameState.pieces, to);

  if (targetPiece && targetPiece.color !== piece.color) {
    return {
      ...move,
      changes: {
        ...move.changes,
        piecePositions: [
          ...move.changes.piecePositions,
          {pieceId: targetPiece.id, from: targetPiece.position, to: null},
        ]
      },
      blocking: true,
    } as TransformersMove;
  }

  return move;
};

export const pawnColorDirectionTransformer: MoveTransformer = (move, {piece, mainPiecePositionChange}) => {
  const {from, to} = mainPiecePositionChange;
  const [, rankDelta] = getBoardPositionDelta(from, to);

  if (
    (piece.color === 'white' && rankDelta <= 0) ||
    (piece.color === 'black' && rankDelta >= 0)
  ) {
    return {...move, invalid: true, blocking: true};
  }

  return move;
};

export const pawnFirstMoveTransformer: MoveTransformer = (move, {piece, mainPiecePositionChange}) => {
  const {from, to} = mainPiecePositionChange;
  const [, rank] = toBoardPositionTuple(from)
  const [, rankDelta] = getBoardPositionDelta(from, to);

  if (
    Math.abs(rankDelta) === 2 &&
    !(
      (rank === '2' && piece.color === 'white') ||
      (rank === '7' && piece.color === 'black')
    )
  ) {
    return {...move, invalid: true, blocking: true};
  }

  return move;
};

export const pawnStraightMoveTransformer: MoveTransformer = (move, {gameState, mainPiecePositionChange}) => {
  const {from, to} = mainPiecePositionChange;
  const [fileDelta, rankDelta] = getBoardPositionDelta(from, to);

  // Check if straight move
  if (!(fileDelta === 0 && rankDelta !== 0)) {
    return move;
  }

  const pieceAtTo = getPieceByPosition(gameState.pieces, to);

  // Any piece at straight move target is invalid
  if (pieceAtTo) {
    return {...move, invalid: true, blocking: true};
  }

  return move;
};

export const pawnDiagonalMoveTransformer: MoveTransformer = (move, {gameState, mainPiecePositionChange, piece}) => {
  const {from, to} = mainPiecePositionChange;
  const [fileDelta, rankDelta] = getBoardPositionDelta(from, to);

  // Check if diagonal move.
  if (Math.abs(fileDelta) !== Math.abs(rankDelta)) {
    return move;
  }

  const targetPiece = getPieceByPosition(gameState.pieces, to);

  // If no piece at diagonal move target, or piece is friendly, it is invalid.
  if (!targetPiece || targetPiece.color === piece.color) {
    return {...move, invalid: true, blocking: true};
  }

  return {
    ...move,
    changes: {
      ...move.changes,
      piecePositions: [
        ...move.changes.piecePositions,
        {pieceId: targetPiece.id, from: targetPiece.position, to: null},
      ]
    },
    blocking: true,
  } as TransformersMove;
};
