import { atom } from 'nanostores';
import { type IDraggingElementIdentifiers } from '@src/typescript/roadmap_ref/dragging/core';

export type IRenderingEngines = 'foreign-object' | 'native-elements';
export const IRenderingEnginesArray: IRenderingEngines[] = [
  'native-elements',
  'foreign-object',
];

export const storeRenderingEngine = atom({
  renderingEngineType: 'foreign-object',
  optimized: true,
} as {
  renderingEngineType: IRenderingEngines;
  optimized: boolean;
});

export const setRenderingEngineType = (type: IRenderingEngines) => {
  const currentStore = storeRenderingEngine.get();
  currentStore.renderingEngineType = type;
  storeRenderingEngine.set({ ...currentStore });
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

export const setRenderingEngineOptimized = (optimized: boolean) => {
  const currentStore = storeRenderingEngine.get();
  currentStore.optimized = optimized;
  storeRenderingEngine.set({ ...currentStore });
};

export const getRenderingEngineOptimized = () => {
  return storeRenderingEngine.get().optimized;
};
