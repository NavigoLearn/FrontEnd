import { atom } from 'nanostores';
import { type HashMap } from '@type/roadmap/misc';

export const elementsGs = atom({} as HashMap<SVGGElement>);
export const elementsRects = atom({} as HashMap<SVGRectElement>);

export const elementsDivs = atom({} as HashMap<HTMLDivElement>);

export function setElementG(id: string, identifierElementRef: SVGGElement) {
  const originalIdentifiers = elementsGs.get();
  elementsGs.set({
    ...originalIdentifiers,
    [id]: identifierElementRef,
  });
}

export function getElementG(id: string) {
  const originalIdentifiers = elementsGs.get();
  return originalIdentifiers[id];
}

export function setElementRect(
  id: string,
  identifierElementRef: SVGRectElement
) {
  const originalIdentifiers = elementsRects.get();
  elementsRects.set({
    ...originalIdentifiers,
    [id]: identifierElementRef,
  });
}

export function getElementRect(id: string) {
  const originalIdentifiers = elementsRects.get();
  return originalIdentifiers[id];
}

export function setElementDiv(
  id: string,
  identifierElementRef: HTMLDivElement
) {
  const originalIdentifiers = elementsDivs.get();
  elementsDivs.set({
    ...originalIdentifiers,
    [id]: identifierElementRef,
  });
}

export function getElementDiv(id: string) {
  const originalIdentifiers = elementsDivs.get();
  return originalIdentifiers[id];
}
