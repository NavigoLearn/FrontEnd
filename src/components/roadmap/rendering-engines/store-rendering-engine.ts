import { atom } from 'nanostores';

type IRendering = 'classic' | 'optimized';
export const storeRenderingEngine = atom({
  renderingType: 'optimized',
} as {
  renderingType: IRendering;
});

export const setRenderingType = (type: IRendering) => {
  storeRenderingEngine.set({ renderingType: type });
};

export const getRenderingType = () => {
  return storeRenderingEngine.get().renderingType;
};
