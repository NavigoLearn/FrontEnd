import { type ISnapDrawCoordintes } from '@store/roadmap-refactor/render/snapping-lines';
import { getNodeAbsoluteCoordsCenter } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function transformSnapCoordsInAbsolute(
  parentNodeId: string,
  snappingsCoords: ISnapDrawCoordintes[]
) {
  const offset = getNodeAbsoluteCoordsCenter(parentNodeId);
  return snappingsCoords.map((snapping) => {
    return {
      startX: snapping.startX + offset.x,
      startY: snapping.startY + offset.y,
      endX: snapping.endX + offset.x,
      endY: snapping.endY + offset.y,
    };
  });
}
