import { atom } from 'nanostores';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { getTracebackNodeToRoot } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { HashMap, HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import {
  effectOpacity100,
  effectOpacity30,
} from '@src/to-be-organized/nodeview/effects';

export type IEffectsNames = 'opacity-30' | 'opacity-100';
export type IEffectFunction = (divElementRef: HTMLDivElement) => void;
export const effectMapper: HashMapWithKeys<IEffectsNames, IEffectFunction> = {
  'opacity-30': effectOpacity30,
  'opacity-100': effectOpacity100,
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
  // applies opacity 50 to all nodes-page except the one with the id
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  // getting the line of parent nodes-page from the node to the root
  const blackListed = getTracebackNodeToRoot(nodeId);
  // add parent nodes-page to blacklisted
  const currentNode = roadmapSelector.get().nodes[nodeId];
  currentNode.subNodeIds.forEach((id) => {
    blackListed.push(id);
  });

  nodes.forEach((id) => {
    // checks whether node is root
    originalEffects[id] = originalEffects[id].filter((effect) => {
      return effect !== 'opacity-30' && effect !== 'opacity-100';
    });
    if (!blackListed.includes(id)) {
      originalEffects[id].push('opacity-30');
    }
  });
  originalEffects[nodeId] = [];
  elementEffects.set({
    ...originalEffects,
  });
}

export function setEditorClosedEffect() {
  // removes opacity 50 from all nodes-page
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    originalEffects[id] = originalEffects[id].filter(
      (effect) => effect !== 'opacity-30'
    );
    originalEffects[id].push('opacity-100');
  });
  elementEffects.set({
    ...originalEffects,
  });
}

export function removeAllEffects() {
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    originalEffects[id] = [];
  });
  elementEffects.set({
    ...originalEffects,
  });
}
