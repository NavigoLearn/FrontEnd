import { atom } from 'nanostores';
import { HashMap } from '@type/roadmap/misc';

export const elementsGs = atom({} as HashMap<SVGGElement>);
export const elementsRects = atom({} as HashMap<SVGRectElement>);

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
