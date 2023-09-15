import { atom } from 'nanostores';
import { IDraggingElementIdentifiers } from '@src/typescript/roadmap_ref/dragging/core';

export type IRenderingEngines = 'foreign-object' | 'native-elements';
export const IRenderingEnginesArray: IRenderingEngines[] = [
  'native-elements',
  'foreign-object',
];

export const storeRenderingEngine = atom({
  renderingEngineType: 'foreign-object',
} as {
  renderingEngineType: IRenderingEngines;
});

export const setRenderingEngineType = (type: IRenderingEngines) => {
  storeRenderingEngine.set({ renderingEngineType: type });
};

export const getRenderingEngineType = () => {
  return storeRenderingEngine.get().renderingEngineType;
};

export const getRenderingEngineDraggingElementIdentifier = () => {
  const mapper: Record<IRenderingEngines, IDraggingElementIdentifiers> = {
    'foreign-object': 'div',
    'native-elements': 'g',
  };
  return mapper[getRenderingEngineType()];
};
