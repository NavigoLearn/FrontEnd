import { atom } from 'nanostores';
import { HashMap, HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import { effectOpacity30 } from '@src/to-be-organized/nodeview/effects';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export type IEffectsNames = 'opacity-30';
export type IEffectFunction = (divElementRef: HTMLDivElement) => void;
export const effectMapper: HashMapWithKeys<IEffectsNames, IEffectFunction> = {
  'opacity-30': effectOpacity30,
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

export function tracebackNodeToRoot(nodeId: string) {
  const tracebackNodes = [];
  let currentNode = roadmapSelector.get().nodes[nodeId];
  while (currentNode.properties.nestedWithin) {
    tracebackNodes.push(currentNode.properties.nestedWithin);
    currentNode =
      roadmapSelector.get().nodes[currentNode.properties.nestedWithin];
  }
  return tracebackNodes;
}

export function setEditorOpenEffect(nodeId: string) {
  // applies opacity 50 to all nodes except the one with the id
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  // getting the line of parent nodes from the node to the root
  const blackListed = tracebackNodeToRoot(nodeId);
  // add parent nodes to blacklisted
  const currentNode = roadmapSelector.get().nodes[nodeId];
  currentNode.subNodeIds.forEach((id) => {
    blackListed.push(id);
  });

  nodes.forEach((id) => {
    // checks whether node is root
    if (!blackListed.includes(id)) originalEffects[id].push('opacity-30');
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
