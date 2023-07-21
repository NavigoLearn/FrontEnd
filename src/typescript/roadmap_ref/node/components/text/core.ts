import { IComponentOptions } from '@type/roadmap/node/options-types';
import { generateId } from '@typescript/roadmap_ref/node/core/misc';

export class ComponentNode {
  x: number;

  y: number;

  width: number;

  height: number;

  type: IComponentOptions;

  name: string;

  id: string;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
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
