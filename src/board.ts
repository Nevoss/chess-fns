import type {BoardFile, BoardRank} from '@/types';

export const boardRanks: readonly BoardRank[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
] as const;

export const boardFiles: readonly BoardFile[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
] as const;

