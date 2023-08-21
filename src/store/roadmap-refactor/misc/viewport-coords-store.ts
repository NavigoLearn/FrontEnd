import { atom } from 'nanostores';
import { Viewport } from '@type/roadmap/old/misc';

const viewportCoord = atom({
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  scale: 1,
} as Viewport);

export function setViewport(viewport: Viewport) {
  const newViewport = { ...viewport };
  newViewport.startX = Math.round(viewport.startX);
  newViewport.startY = Math.round(viewport.startY);
  newViewport.endX = Math.round(viewport.endX);
  newViewport.endY = Math.round(viewport.endY);
  newViewport.scale = Math.round(viewport.scale * 100) / 100;
  viewportCoord.set({ ...newViewport });
}

export default viewportCoord;
