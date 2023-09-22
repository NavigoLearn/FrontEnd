import { atom } from 'nanostores';

type IRoadmapFunctionsUtils = {
  disableRoadmapDrag: () => void;
  enableRoadmapDrag: () => void;
};
export const roadmapFunctionsUtils = atom({
  disableRoadmapDrag: () => {},
  enableRoadmapDrag: () => {},
} as IRoadmapFunctionsUtils);

export const setRoadmapDisableDragAndZoom = (disableDrag: () => void) => {
  roadmapFunctionsUtils.set({
    ...roadmapFunctionsUtils.get(),
    disableRoadmapDrag: disableDrag,
  });
};

export const setRoadmapEnableDragAndZoom = (enableDrag: () => void) => {
  roadmapFunctionsUtils.set({
    ...roadmapFunctionsUtils.get(),
    enableRoadmapDrag: enableDrag,
  });
};

export const getRoadmapDisableInteractions = () => {
  return roadmapFunctionsUtils.get().disableRoadmapDrag;
};

export const getRoadmapEnableInteractions = () => {
  return roadmapFunctionsUtils.get().enableRoadmapDrag;
};

export const enableRoadmapInteractions = () => {
  getRoadmapEnableInteractions()();
};

export const disableRoadmapInteractions = () => {
  getRoadmapDisableInteractions()();
};
