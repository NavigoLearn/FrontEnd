import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { clipValue } from '@src/typescript/roadmap_ref/utils';
import { MAX_NAME_LENGTH } from '@src/typescript/roadmap_ref/node/components/text/text-params';

export function nodeNameSyncer(nodeId: string, newValue: string) {
  const node: NodeClass = getNodeByIdRoadmapSelector(nodeId);
  const clippedValue = clipValue(newValue, MAX_NAME_LENGTH);
  if (newValue.length < MAX_NAME_LENGTH) {
    node.name = clippedValue;
  }

  // @ts-ignore
  const oldTitleText = node.attachments[0].components[0].titleText;
  if (!(oldTitleText.length > clippedValue.length)) {
    // @ts-ignore
    node.attachments[0].components[0].titleText = newValue;
  }
}
