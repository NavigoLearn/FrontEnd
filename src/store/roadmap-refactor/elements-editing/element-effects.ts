import { atom } from 'nanostores';
import { HashMap, HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import { effectOpacity50 } from '@src/to-be-organized/nodeview/effects';

export type IEffectsNames = 'opacity-50';
export type IEffectFunction = (divElementRef: HTMLDivElement) => void;
export const effectMapper: HashMapWithKeys<IEffectsNames, IEffectFunction> = {
  'opacity-50': effectOpacity50,
};

export const elementEffects = atom({} as HashMap<IEffectsNames[]>);

export function setElementEffects(id: string, effects: IEffectsNames[]) {
  const originalEffects = elementEffects.get();
  elementEffects.set({
    ...originalEffects,
    [id]: effects,
  });
}

export function setElementEffectsEmpty(id: string) {
  const originalEffects = elementEffects.get();
  originalEffects[id] = [];
  elementEffects.set({
    ...originalEffects,
  });
}
export function applyElementEffects(id: string, divElementRef: HTMLDivElement) {
  const originalEffects = elementEffects.get();
  originalEffects[id].forEach((effect) => {
    effectMapper[effect](divElementRef);
  });
}

export function setEditorOpenEffect(nodeId: string) {
  // applies opacity 50 to all nodes except the one with the id
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    originalEffects[id] = ['opacity-50'];
  });
  originalEffects[nodeId] = [];
  elementEffects.set({
    ...originalEffects,
  });
}

export function setEditorClosedEffect() {
  // removes opacity 50 from all nodes
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    originalEffects[id] = [];
  });
  elementEffects.set({
    ...originalEffects,
  });
}
