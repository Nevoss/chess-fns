import type {
  BoardFile,
  BoardPosition,
  BoardRank,
  OnBoardPiece,
  Piece,
  PieceColor,
  Move,
  PieceMainPositionChange, BoardPositionTuple
} from "@/types";
import {boardFiles, boardRanks} from "@/board";
import {PieceId} from "@/types";

export function isOnBoardPiece(piece: Piece): piece is OnBoardPiece {
  return !!piece.position?.length;
}

export function isPieceColor(color: any): color is PieceColor {
  return ['white', 'black'].includes(color);
}

export function isBoardPosition(position: any): position is BoardPosition {
  if (typeof position !== 'string' || position.length !== 2) {
    return false;
  }

  const [file, rank] = toBoardPositionTuple( position as BoardPosition );

  return boardFiles.includes(file) && boardRanks.includes(rank);
}

export function getMainPiecePositionChange(move: Move): PieceMainPositionChange {
  return move.changes.piecePositions[0];
}

export function getPieceById(pieces: Piece[], pieceId: PieceId): Piece | undefined {
  return pieces.find(piece => piece.id === pieceId);
}

export function getPieceByPosition(pieces: Piece[], position: BoardPosition): OnBoardPiece | undefined {
  return pieces.find(piece => isOnBoardPiece(piece) && piece.position === position) as OnBoardPiece | undefined;
}

export function toBoardPositionTuple(position: BoardPosition): BoardPositionTuple {
  const [file, rank] = position.split('') as [BoardFile, BoardRank];

  return [file, rank];
}

export function getBoardPositionIndexes(position: BoardPosition): [number, number] {
  const [file, rank] = toBoardPositionTuple( position );

  return [boardFiles.indexOf(file), boardRanks.indexOf(rank)];
}

export function getBoardPositionDelta(from: BoardPosition, to: BoardPosition): [number, number] {
  const [fromFileIndex, fromRankIndex] = getBoardPositionIndexes(from);
  const [toFileIndex, toRankIndex] = getBoardPositionIndexes(to);

  return [toFileIndex - fromFileIndex, toRankIndex - fromRankIndex];
}
