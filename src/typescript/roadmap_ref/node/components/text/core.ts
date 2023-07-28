import { generateId } from '@src/typescript/roadmap_ref/node/core/misc';
import { ComponentNode } from '@src/typescript/roadmap_ref/node/components/core';

class ComponentText extends ComponentNode {
  text: string;

  textSize: number;

  textFont: string;

  textColor: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    textSize: number,
    textFont: string,
    textColor: string
  ) {
    super(x, y, width, height);
    this.text = text;
    this.textSize = textSize;
    this.textFont = textFont;
    this.textColor = textColor;
  }
}

export class ComponentTitle extends ComponentText {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    title: string
  ) {
    super(x, y, width, height, title, 100, '', '');
    this.id = generateId();
    this.type = 'Title';
  }
}

export class ComponentDescription extends ComponentText {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    description: string
  ) {
    super(x, y, width, height, description, 50, '', '');
    this.id = generateId();
    this.type = 'Description';
  }
}
