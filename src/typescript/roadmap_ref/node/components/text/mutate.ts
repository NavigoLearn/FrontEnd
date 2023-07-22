import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';
import { decoratorTriggerRerenderEditor } from '@typescript/roadmap_ref/node/decorators/rerenders';

export function mutateComponentTitleWidth(
  component: ComponentTitle,
  width: number
) {
  component.width = width;
}

export function mutateComponentTitleHeight(
  component: ComponentTitle,
  height: number
) {
  component.height = height;
}

export function mutateComponentTitleX(component: ComponentTitle, x: number) {
  component.x = x;
}

export function mutateComponentTitleY(component: ComponentTitle, y: number) {
  component.y = y;
}

export const mutateComponentTitleText = decoratorTriggerRerenderEditor(
  (component: ComponentTitle, text: string) => {
    component.text = text;
  }
);

export function mutateComponentTitleTextSize(
  component: ComponentTitle,
  textSize: number
) {
  component.textSize = textSize;
}

export function mutateComponentDescriptionWidth(
  component: ComponentDescription,
  width: number
) {
  component.width = width;
}

export function mutateComponentDescriptionHeight(
  component: ComponentDescription,
  height: number
) {
  component.height = height;
}

export function mutateComponentDescriptionX(
  component: ComponentDescription,
  x: number
) {
  component.x = x;
}

export function mutateComponentDescriptionY(
  component: ComponentDescription,
  y: number
) {
  component.y = y;
}

export function mutateComponentDescriptionText(
  component: ComponentDescription,
  text: string
) {
  component.text = text;
}

export function mutateComponentDescriptionTextSize(
  component: ComponentDescription,
  textSize: number
) {
  component.textSize = textSize;
}
