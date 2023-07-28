export type ICoords = {
  x: number;
  y: number;
};

export type draggingStrategies = 'free' | 'snap' | 'grid';
export type draggingElementIdentifiers = 'g' | 'div';
export class DraggingBehavior {
  // how it works:

  coordinatesAdapter: (x: number, y: number) => ICoords; // the function that adapts the coordinates to the dragging space

  coordinatesSetter: (x: number, y: number) => void; // the function that sets the coordinates of the element node that is dragged

  draggingElementIdentifier: draggingElementIdentifiers; // the type of the element node that is dragged eg div, group, h1, svg, etc

  draggingElementId: string; // the id of the element node that is dragged

  draggingStrategyType = 'free'; // free, snap, grid, etc

  draggingStrategy: (newX, newY) => ICoords; // the function that is called when the element is dragged

  getCurrentCoords: () => ICoords; // the function that returns the current coordinates of the element node that is dragged

  draggingProtocol(x: number, y: number) {
    const { x: adaptedX, y: adaptedY } = this.coordinatesAdapter(x, y);
    const { x: newX, y: newY } = this.draggingStrategy(adaptedX, adaptedY);
    this.coordinatesSetter(newX, newY);
  }
}

export const a = 2;
