import { ComponentNode } from '@src/typescript/roadmap_ref/node/components/core';
import {
  DEFAULT_TEXT_SIZE,
  DEFAULT_TEXT_WEIGHT,
  DEFAULT_TEXT_OPACITY,
} from '@src/typescript/roadmap_ref/node/components/text/text-params';
import {
  type ITextSizeModes,
  type ITextWidthModes,
} from '@src/types/roadmap/node/components-types';
import { getLastOpacity } from '@src/to-be-organized/components-store';

export class ComponentText extends ComponentNode {
  text: string;

  textSize: keyof ITextSizeModes;

  textWeight: keyof ITextWidthModes;

  opacity: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    opacity = getLastOpacity() === 0 ? DEFAULT_TEXT_OPACITY : getLastOpacity()
  ) {
    super('Text', x, y, width, height);
    this.text = text;
    this.textSize = DEFAULT_TEXT_SIZE;
    this.textWeight = DEFAULT_TEXT_WEIGHT;
    this.opacity = opacity;
  }
}
