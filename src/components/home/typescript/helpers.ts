export interface ParallaxObject {
  targetX: number;
  targetY: number;
  sinOffset: number;
}

export const SPACING_X = 250;
export const SPACING_Y = 300;
export const X_MIN = -300;
export const Y_MIN = -300;
export const X_MAX = 2220;
export const Y_MAX = 1480;
export const RANDOM_OFFSET = 0.7;
export const MAX_MOVE_PER_FRAME = 100;

export const lerp = (
  current: number,
  target: number,
  speed: number
): number => {
  let diff = speed * (target - current);

  if (Math.abs(diff) > MAX_MOVE_PER_FRAME) {
    diff = MAX_MOVE_PER_FRAME * Math.sign(diff);
  }

  return current + diff;
};

let savedObjects: ParallaxObject[] = [];
export const generateObjects = (): ParallaxObject[] => {
  if (savedObjects.length > 0) return savedObjects;

  const objects = [];
  for (let x = X_MIN; x < X_MAX; x += SPACING_X) {
    for (let y = Y_MIN; y < Y_MAX; y += SPACING_Y) {
      const targetX = x + Math.random() * RANDOM_OFFSET * SPACING_X;
      const targetY = y + Math.random() * RANDOM_OFFSET * SPACING_Y;
      const sinOffset = Math.floor(Math.random() * 360) % 360;
      objects.push({ targetX, targetY, sinOffset });
    }
  }

  savedObjects = objects;

  return objects;
};

export const screenCenter = (): [number, number] => {
  return [window.innerWidth / 2, window.innerHeight / 2];
};
