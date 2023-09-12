import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { decoratorTriggerRerenderEditor } from '@src/typescript/roadmap_ref/node/decorators/rerenders';
import {
  ITextSizeModes,
  ITextWidthModes,
} from '@src/types/roadmap/node/components-types';

export function mutateComponentTextWidth(
  component: ComponentText,
  width: number
) {
  component.width = width;
}

export function mutateComponentTextHeight(
  component: ComponentText,
  height: number
) {
  component.height = height;
}

export function mutateComponentTextX(component: ComponentText, x: number) {
  component.x = x;
}

export function mutateComponentTextY(component: ComponentText, y: number) {
  component.y = y;
}

export const mutateComponentTextText = decoratorTriggerRerenderEditor(
  (component: ComponentText, text: string) => {
    component.text = text;
  }
);

export function mutateComponentTextSize(
  component: ComponentText,
  textSize: keyof ITextSizeModes
) {
  component.textSize = textSize;
  console.log(component.textSize);
}

export function mutateComponentTextWeight(
  component: ComponentText,
  textWeight: keyof ITextWidthModes
) {
  component.textWeight = textWeight;
  console.log(component.textWeight);
}
