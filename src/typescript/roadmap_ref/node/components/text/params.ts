import {
  ITextSizeModes,
  ITextWidthModes,
} from '@src/types/roadmap/node/components-types';
import { getLastOpacity } from '@src/to-be-organized/components-store';

export const DEFAULT_TEXT_SIZE: keyof ITextSizeModes = 'normal';
export const DEFAULT_TEXT_WEIGHT: keyof ITextWidthModes = 'normal';
export const DEFAULT_TEXT_OPACITY = 60;

export const MAX_NAME_LENGTH = 30;
