import {
  ComponentDescription,
  ComponentTitle,
} from '@src/typescript/roadmap_ref/node/components/text/core';

export type IComponentObject = ComponentTitle | ComponentDescription;

export type IFontSizeType = 'normal' | 'large' | 'small';
export type IFontWeightType = 'normal' | 'bold';

export const FontSizeValues: Record<IFontSizeType, string> = {
  normal: '1.2rem',
  large: '1.6rem',
  small: '0.8rem',
};
