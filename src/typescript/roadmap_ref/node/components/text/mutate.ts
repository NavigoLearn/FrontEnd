import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { decoratorTriggerRerenderEditor } from '@src/typescript/roadmap_ref/node/decorators/rerenders';

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

export function mutateComponentTitleTextSize(
  component: ComponentText,
  textSize: number
) {
  component.fontSize = textSize;
}
