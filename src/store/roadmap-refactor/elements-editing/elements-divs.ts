import { atom } from 'nanostores';
import { HashMap } from '@type/roadmap/stores/roadmap';

export const elementsDivs = atom({} as HashMap<HTMLDivElement>);

export function setElementDiv(id: string, divElementRef: HTMLDivElement) {
  const originalDivs = elementsDivs.get();
  elementsDivs.set({
    ...originalDivs,
    [id]: divElementRef,
  });
}

export function getElementDiv(id: string) {
  const originalDivs = elementsDivs.get();
  return originalDivs[id];
}
