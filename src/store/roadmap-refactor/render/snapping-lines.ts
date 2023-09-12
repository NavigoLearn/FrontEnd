import { atom } from 'nanostores';

export type ISnapDrawCoordintes = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};
export const snappingCoordinates = atom({
  snappings: [],
} as {
  snappings: ISnapDrawCoordintes[];
});

export const checkIfSnappingExists = (snapping: ISnapDrawCoordintes) => {
  const { snappings } = snappingCoordinates.get();
  return snappings.some(
    (existingSnapping) =>
      existingSnapping.startX === snapping.startX &&
      existingSnapping.startY === snapping.startY &&
      existingSnapping.endX === snapping.endX &&
      existingSnapping.endY === snapping.endY
  );
};
export const appendSnapping = (snapping: ISnapDrawCoordintes) => {
  if (checkIfSnappingExists(snapping)) return;
  const { snappings } = snappingCoordinates.get();
  snappings.push(snapping);
  snappingCoordinates.set({ snappings });
};

export const deleteAllSnappings = () => {
  if (snappingCoordinates.get().snappings.length === 0) return;
  snappingCoordinates.set({ snappings: [] });
};

export const setSnappings = (snappings: ISnapDrawCoordintes[]) => {
  // check if snappings are the same
  const { snappings: currentSnappings } = snappingCoordinates.get();
  if (currentSnappings.length === snappings.length) {
    const areSnappingsTheSame = snappings.every((snapping) =>
      currentSnappings.some(
        (currentSnapping) =>
          currentSnapping.startX === snapping.startX &&
          currentSnapping.startY === snapping.startY &&
          currentSnapping.endX === snapping.endX &&
          currentSnapping.endY === snapping.endY
      )
    );
    if (areSnappingsTheSame) return;
  }
  // if not the same delete all and set new
  deleteAllSnappings();
  snappings.forEach((snapping) => {
    appendSnapping(snapping);
  });
};

export const deleteSnappingsThatDoNotMatch = (
  snappings: ISnapDrawCoordintes[]
) => {
  const { snappings: currentSnappings } = snappingCoordinates.get();
  const newSnappings = currentSnappings.filter((currentSnapping) =>
    snappings.some(
      (snapping) =>
        currentSnapping.startX === snapping.startX &&
        currentSnapping.startY === snapping.startY &&
        currentSnapping.endX === snapping.endX &&
        currentSnapping.endY === snapping.endY
    )
  );
  snappingCoordinates.set({ snappings: newSnappings });
};
