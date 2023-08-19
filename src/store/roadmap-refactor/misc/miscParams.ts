import { atom } from 'nanostores';
import { getTriggerTooltip } from '@store/roadmap-refactor/render/rerender-triggers-nodes';

const miscParamsStore = atom({
  // holds misc params of the roadmap
  zoomAllowed: true,
  disableZoomTrigger: () => {
    // disables the zoom trigger
  },
  enableZoomTrigger: () => {
    // enables the zoom trigger
  },
  recenterRoadmap: () => {
    // recenter the roadmap
  },
  moveRoadmapTo: (x: number, y: number, k: number) => {
    // move the roadmap to a specific location
  },
  editingCount: 0,
  chunkSize: 400,
  toolTip: {}, // functions that render-roadmap-roadmap-data react reusable-components-page with the desired functionality
} as {
  zoomAllowed: boolean;
  disableZoomTrigger: () => void;
  enableZoomTrigger: () => void;
  recenterRoadmap: () => void;
  moveRoadmapTo: (x: number, y: number, k: number) => void;
  editingCount: number;
  chunkSize: number;
  toolTip: { [key: string]: any };
});

export function setRecenterRoadmap(value: () => void) {
  const newStore = miscParamsStore.get();
  newStore.recenterRoadmap = value;
  miscParamsStore.set({ ...newStore });
}

export function triggerMoveRoadmapTo(x: number, y: number, k: number) {
  miscParamsStore.get().moveRoadmapTo(x, y, k);
}

export function setMoveRoadmapTo(
  value: (x: number, y: number, k: number) => void
) {
  const newStore = miscParamsStore.get();
  newStore.moveRoadmapTo = value;
  miscParamsStore.set({ ...newStore });
}

export function triggerRecenterRoadmap() {
  miscParamsStore.get().recenterRoadmap();
}

export function getEnableZoomTrigger() {
  return miscParamsStore.get().enableZoomTrigger;
}

export function getDisableZoomTrigger() {
  return miscParamsStore.get().disableZoomTrigger;
}

export function evaluateZoomAllowed() {
  const { zoomAllowed } = miscParamsStore.get();
  if (zoomAllowed) {
    getEnableZoomTrigger()();
  } else {
    getDisableZoomTrigger()();
  }
}
export function setEnableZoomTrigger(value: () => void) {
  const newStore = miscParamsStore.get();
  newStore.enableZoomTrigger = value;
  miscParamsStore.set({ ...newStore });
}

export function setDisableZoomTrigger(value: () => void) {
  const newStore = miscParamsStore.get();
  newStore.disableZoomTrigger = value;
  miscParamsStore.set({ ...newStore });
}

export function setZoomAllowed(value: boolean) {
  const newStore = miscParamsStore.get();
  newStore.zoomAllowed = value;
  miscParamsStore.set({ ...newStore });
  evaluateZoomAllowed();
}

export function increaseEditingCount() {
  const newStore = miscParamsStore.get();
  newStore.editingCount += 1;
  miscParamsStore.set({ ...newStore });
  evaluateZoomAllowed();
}

export function decreaseEditingCount() {
  const newStore = miscParamsStore.get();
  newStore.editingCount -= 1;
  miscParamsStore.set({ ...newStore });
  evaluateZoomAllowed();
}

export function useToolTip(nodeId: string) {
  const { toolTip } = miscParamsStore.get();
  return toolTip[nodeId];
}

export function setToolTip(nodeId: string, value: any) {
  const newStore = miscParamsStore.get();
  newStore.toolTip[nodeId] = value;
  // setting a new tooltip should also trigger a render-roadmap-roadmap-data
  miscParamsStore.set({ ...newStore });
  getTriggerTooltip(nodeId)();
}

export function resetAllTooltips() {
  const newStore = miscParamsStore.get();
  newStore.toolTip = {};
  miscParamsStore.set({ ...newStore });
}

export default miscParamsStore;
