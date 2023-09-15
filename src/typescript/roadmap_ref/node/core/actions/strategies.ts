import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { setTabNode } from '@store/roadmap-refactor/display/tab-attachment/selected-tab';
import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import { isSafeUrl, openRoadmapLink } from '@src/typescript/utils/urlUtils';

export type IActionStrategy = (nodeId: string) => void;

export const actionStrategyDoNothing: IActionStrategy = () => {};

export const actionStrategyOpenLink: IActionStrategy = (nodeId: string) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { data } = node;
  const { link } = node.actions.additionalData;
  if (link) {
    openRoadmapLink(link);
  }
};

export const actionStrategyOpenTab: IActionStrategy = (nodeId: string) => {
  setTabNode(nodeId);
  setDisplayPageType('tab');
};
