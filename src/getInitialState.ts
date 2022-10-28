import type {GameState} from "./types";

export default function getInitialState(): GameState {
  return {
    turn: 'white',
    pieces: [
      {id: "white-pawn-1", type: "pawn", color: "white", position: "a2"},
      {id: "white-pawn-2", type: "pawn", color: "white", position: "b2"},
      {id: "white-pawn-3", type: "pawn", color: "white", position: "c2"},
      {id: "white-pawn-4", type: "pawn", color: "white", position: "d2"},
      {id: "white-pawn-5", type: "pawn", color: "white", position: "e2"},
      {id: "white-pawn-6", type: "pawn", color: "white", position: "f2"},
      {id: "white-pawn-7", type: "pawn", color: "white", position: "g2"},
      {id: "white-pawn-8", type: "pawn", color: "white", position: "h2"},
      {id: "white-rook-1", type: "rook", color: "white", position: "a1"},
      {id: "white-rook-2", type: "rook", color: "white", position: "h1"},
      {id: "white-knight-1", type: "knight", color: "white", position: "b1"},
      {id: "white-knight-2", type: "knight", color: "white", position: "g1"},
      {id: "white-bishop-1", type: "bishop", color: "white", position: "c1"},
      {id: "white-bishop-2", type: "bishop", color: "white", position: "f1"},
      {id: "white-queen", type: "queen", color: "white", position: "d1"},
      {id: "white-king", type: "king", color: "white", position: "e1"},
      {id: "black-pawn-1", type: "pawn", color: "black", position: "a7"},
      {id: "black-pawn-2", type: "pawn", color: "black", position: "b7"},
      {id: "black-pawn-3", type: "pawn", color: "black", position: "c7"},
      {id: "black-pawn-4", type: "pawn", color: "black", position: "d7"},
      {id: "black-pawn-5", type: "pawn", color: "black", position: "e7"},
      {id: "black-pawn-6", type: "pawn", color: "black", position: "f7"},
      {id: "black-pawn-7", type: "pawn", color: "black", position: "g7"},
      {id: "black-pawn-8", type: "pawn", color: "black", position: "h7"},
      {id: "black-rook-1", type: "rook", color: "black", position: "a8"},
      {id: "black-rook-2", type: "rook", color: "black", position: "h8"},
      {id: "black-knight-1", type: "knight", color: "black", position: "b8"},
      {id: "black-knight-2", type: "knight", color: "black", position: "g8"},
      {id: "black-bishop-1", type: "bishop", color: "black", position: "c8"},
      {id: "black-bishop-2", type: "bishop", color: "black", position: "f8"},
      {id: "black-queen", type: "queen", color: "black", position: "d8"},
      {id: "black-king", type: "king", color: "black", position: "e8"},
    ],
    canCastle: {
      white: {kingSide: true, queenSide: true},
      black: {kingSide: true, queenSide: true}
    },
    enPassantTarget: null,
    halfMoveClock: 0,
    history: [],
  };
}
