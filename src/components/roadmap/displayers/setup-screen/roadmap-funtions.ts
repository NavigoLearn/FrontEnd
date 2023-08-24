import {
  roadmapSelector,
  setRoadmapSelector,
} from '@src/store/roadmap-refactor/roadmap-data/roadmap-selector';
import roadmapState from '@src/store/roadmap-refactor/roadmap-data/roadmap_state';

export interface ISetupScreenControlers {
  onNext: () => void;
  handleExit: () => void;
}

export const getCurrentRoadmap = () => {
  return roadmapSelector.get();
};
export const currentRoadmap = getCurrentRoadmap();

export const saveRoadmapChanges = () => {
  setRoadmapSelector(currentRoadmap);
};

// export const exitSetupScreen = () => {
//   const originalRoadmap = roadmapState.get();
//   roadmapState.set({ ...originalRoadmap, starterTab: true });
// };
