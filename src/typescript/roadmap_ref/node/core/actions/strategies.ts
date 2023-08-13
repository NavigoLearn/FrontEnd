import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { setTabNode } from '@store/roadmap-refactor/display/tab-attachment/selected-tab';

export type IActionStrategy = (nodeId: string) => void;

export const actionStrategyDoNothing: IActionStrategy = () => {};

export const actionStrategyOpenLink: IActionStrategy = (nodeId: string) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { data } = node;
  const { link } = node.actions.additionalData;
  if (link) {
    window.open(link, '_blank');
  }
};

export const actionStrategyOpenTab: IActionStrategy = (nodeId: string) => {
  setTabNode(nodeId);
  setDisplayPageType('tab');
};
