import createHandler from '@/move-handlers/createHandler';
import { boardFiles, boardRanks } from '@/board';

export const toTop = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex], boardRanks[rankIndex + delta]];
});

export const toBottom = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex], boardRanks[rankIndex - delta]];
});

export const toLeft = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex]];
});

export const toRight = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex]];
});

export const toTopLeft = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta]];
});

export const toTopRight = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta]];
});

export const toBottomLeft = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta]];
});

export const toBottomRight = createHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta]];
});

export const knightToTopLeft = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta * 2]];
  }
);

export const knightToLeftTop = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex + delta]];
  }
);

export const knightToBottomLeft = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta * 2]];
  }
);

export const knightToLeftBottom = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex - delta]];
  }
);

export const knightToTopRight = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta * 2]];
  }
);

export const knightToRightTop = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex + delta]];
  }
);

export const knightToBottomRight = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta * 2]];
  }
);

export const knightToRightBottom = createHandler(
  ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex - delta]];
  }
);
