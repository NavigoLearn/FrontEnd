import {
  roadmapSelector,
  setRoadmapSelector,
} from '@src/store/roadmap-refactor/roadmap-data/roadmap-selector';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';

export interface ISetupScreenControlers {
  onNext: () => void;
  handleExit: () => void;
}

export const getCurrentRoadmap = () => {
  return roadmapSelector.get();
};
export const saveRoadmapChanges = () => {
  setRoadmapSelector(getCurrentRoadmap());
};

// export const exitSetupScreen = () => {
//   const originalRoadmap = roadmapState.get();
//   roadmapState.set({ ...originalRoadmap, starterTab: true });
// };
