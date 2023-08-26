import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';

export type IComponentObject = ComponentText;

export interface ITextWidthStyle {
  fontWeight: '300' | '450' | '650';
}

export interface ITextSizeStyle {
  fontSize: string;
}

export interface ITextWidthModes {
  thin: ITextWidthStyle;
  normal: ITextWidthStyle;
  thick: ITextWidthStyle;
}

export interface ITextSizeModes {
  small: ITextSizeStyle;
  normal: ITextSizeStyle;
  large: ITextSizeStyle;
}
