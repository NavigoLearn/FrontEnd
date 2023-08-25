import { ComponentNode } from '@src/typescript/roadmap_ref/node/components/core';
import {
  DEFAULT_TEXT_SIZE,
  DEFAULT_TEXT_WEIGHT,
} from '@src/typescript/roadmap_ref/node/components/text/params';

export class ComponentText extends ComponentNode {
  text: string;

  fontSize: number;

  fontWeight: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ) {
    super('Text', x, y, width, height);
    this.text = text;
    this.fontSize = DEFAULT_TEXT_SIZE;
    this.fontWeight = DEFAULT_TEXT_WEIGHT;
  }
}
