import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';

export function trimText(text: string, length: number): string {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }
  return text;
}
export function getTitleName(component: ComponentTitle): string {
  return trimText(component.text, 20);
}

export function getDescriptionName(component: ComponentDescription): string {
  return trimText(component.text, 20);
}
