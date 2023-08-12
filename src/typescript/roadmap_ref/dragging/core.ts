export type ICoords = {
  x: number;
  y: number;
};

export type IDraggingStrategies = 'free' | 'snap' | 'grid';
export type IDraggingElementIdentifiers = 'g' | 'div';
export type IDraggingElementType = 'node' | 'subNode' | 'component';
export class DraggingBehavior {
  // how it works:

  coordinatesAdapter: (x: number, y: number) => ICoords; // the function that adapts the coordinates to the dragging space

  coordinatesSetterAndRerenders: (x: number, y: number) => void; // the function that sets the coordinates of the element node that is dragged

  draggingElementIdentifier: IDraggingElementIdentifiers; // the type of the element node that is dragged eg div, group, h1, svg, etc

  draggingElementId: string; // the id of the element node that is dragged

  draggingStrategyType = 'free'; // free, snap, grid, etc

  draggingElementType: IDraggingElementType = 'node';

  draggingStrategy: (newX, newY) => ICoords; // the function that is called when the element is dragged

  getCurrentCoords: () => ICoords; // the function that returns the current coordinates of the element node that is dragged
}

export const a = 2;
