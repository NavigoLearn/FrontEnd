type Coords = {
  x: number;
  y: number;
};

type BoundingBox = {
  topLeft: Coords;
  bottomRight: Coords;
  topRight: Coords;
  bottomLeft: Coords;
};

function initializeBoundingBox(): BoundingBox {
  return {
    topLeft: {
      x: 0,
      y: 0,
    },
    bottomRight: {
      x: 0,
      y: 0,
    },
    topRight: {
      x: 0,
      y: 0,
    },
    bottomLeft: {
      x: 0,
      y: 0,
    },
  };
}

function setBoundingBox(
  xTopLeft: number,
  yTopLeft: number,
  xBottomRight: number,
  yBottomRight: number
): BoundingBox {
  return {
    topLeft: {
      x: xTopLeft,
      y: yTopLeft,
    },
    bottomRight: {
      x: xBottomRight,
      y: yBottomRight,
    },
    topRight: {
      x: xBottomRight,
      y: yTopLeft,
    },
    bottomLeft: {
      x: xTopLeft,
      y: yBottomRight,
    },
  };
}
export class DraggingBehavior {
  spaceBoundingBox: BoundingBox = initializeBoundingBox(); // bounding box of the parent space/element relative to its center

  coords: Coords = {
    // coords of the current element relative to the parent center
    x: 0,
    y: 0,
  };

  elementBoundingBox: BoundingBox = initializeBoundingBox(); // bounding box of the current element relative to its center
  // so for an element of width 100 and height 100, the bounding box will be: -50 -50 50 50 ( but coords will be 0 0 and calc from the center)

  snappingXAxis: number[] = []; // The coords for the X's where the element edges should snap to
  // check whether centerX + elementBoundingBox.topLeft.x is in snappingXAxis

  snappingYAxis: number[] = []; // The coords for the Y's where the element edges should snap to

  draggingStrategyType = 'free'; // free, snap, grid, etc

  draggingStrategy: () => void = () => {}; // the function that will be called when the element is dragged
}

export const a = 2;
