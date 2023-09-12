import { ComponentNode } from '@src/typescript/roadmap_ref/node/components/core';
import {
  DEFAULT_TEXT_SIZE,
  DEFAULT_TEXT_WEIGHT,
} from '@src/typescript/roadmap_ref/node/components/text/params';
import {
  ITextSizeModes,
  ITextWidthModes,
} from '@src/types/roadmap/node/components-types';

export class ComponentText extends ComponentNode {
  text: string;

  textSize: keyof ITextSizeModes;

  textWeight: keyof ITextWidthModes;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ) {
    super('Text', x, y, width, height);
    this.text = text;
    this.textSize = DEFAULT_TEXT_SIZE;
    this.textWeight = DEFAULT_TEXT_WEIGHT;
  }
}
