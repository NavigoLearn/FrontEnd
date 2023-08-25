import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';

type IRoadmapFunctionsUtils = {
  disableRoadmapDrag: () => void;
  enableRoadmapDrag: () => void;
};
export const roadmapFunctionsUtils = atom({
  disableRoadmapDrag: () => {},
  enableRoadmapDrag: () => {},
} as IRoadmapFunctionsUtils);

export const setRoadmapDisableDrag = (disableDrag: () => void) => {
  roadmapFunctionsUtils.set({
    ...roadmapFunctionsUtils.get(),
    disableRoadmapDrag: disableDrag,
  });
};

export const setRoadmapEnableDrag = (enableDrag: () => void) => {
  roadmapFunctionsUtils.set({
    ...roadmapFunctionsUtils.get(),
    enableRoadmapDrag: enableDrag,
  });
};

export const getRoadmapDisableDrag = () => {
  return roadmapFunctionsUtils.get().disableRoadmapDrag;
};

export const getRoadmapEnableDrag = () => {
  return roadmapFunctionsUtils.get().enableRoadmapDrag;
};
