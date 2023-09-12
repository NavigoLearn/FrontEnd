import { atom } from 'nanostores';

type IRendering = 'classic' | 'optimized';
export const storeRenderingEngine = atom({
  renderingType: 'classic',
} as {
  renderingType: IRendering;
});

export const setRenderingType = (type: IRendering) => {
  storeRenderingEngine.set({ renderingType: type });
};

export const getRenderingType = () => {
  return storeRenderingEngine.get().renderingType;
};
