import {
  type ITextSizeModes,
  type ITextWidthModes,
} from '@src/types/roadmap/node/components-types';

export const textWidthModes: ITextWidthModes = {
  thin: {
    fontWeight: '300',
  },
  normal: {
    fontWeight: '450',
  },
  thick: {
    fontWeight: '650',
  },
};

export const textSizeModes: ITextSizeModes = {
  small: {
    fontSize: '14px',
  },
  normal: {
    fontSize: '18px',
  },
  large: {
    fontSize: '22px',
  },
};
