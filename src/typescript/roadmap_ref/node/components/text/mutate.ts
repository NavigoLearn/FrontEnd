import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { decoratorTriggerRerenderEditor } from '@src/typescript/roadmap_ref/node/decorators/rerenders';
import {
  type ITextSizeModes,
  type ITextWidthModes,
} from '@src/types/roadmap/node/components-types';
import { setLastOpacity } from '@src/to-be-organized/components-store';

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
}

export function mutateComponentTextWeight(
  component: ComponentText,
  textWeight: keyof ITextWidthModes
) {
  component.textWeight = textWeight;
}

export function mutateComponentTextOpacity(
  component: ComponentText,
  opacity: number
) {
  component.opacity = opacity;
  setLastOpacity(opacity);
}

export function mutateAllComponentsTextOpacity(
  components: ComponentText[],
  opacity: number
) {
  components.forEach((component) => {
    mutateComponentTextOpacity(component, opacity);
  });
}
