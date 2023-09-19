export type ICoords = {
  x: number;
  y: number;
};

export type IDraggingStrategies = 'free' | 'snap' | 'grid';
export type IDraggingElementIdentifiers = 'g' | 'div';
export type IDraggingElementType = 'node' | 'subNode' | 'component';

export class DraggingBehavior {
  // how it works:

  draggingElementId: string; // the id of the element node that is dragged

  draggingStrategyType = 'free'; // free, snap, grid, etc

  draggingElementType: IDraggingElementType = 'node';

  additionalData: {
    parentNodeId: string;
  };
}
