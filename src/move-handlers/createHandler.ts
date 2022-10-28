import type {IncompleteMoveHandler, MoveHandler} from './types';

export default function createHandler(
  incompleteMoveHandler: IncompleteMoveHandler
): MoveHandler {
  return ([fileIndex, rankIndex], delta) => {
    const [file, rank] = incompleteMoveHandler([fileIndex, rankIndex], delta);

    if (!file || !rank) {
      return null;
    }

    return `${file}${rank}`;
  };
}

