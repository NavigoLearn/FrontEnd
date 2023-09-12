import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';

export function trimText(text: string, length: number): string {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }
  return text;
}
export function getComponentTextName(component: ComponentText): string {
  return trimText(component.text, 20);
}
