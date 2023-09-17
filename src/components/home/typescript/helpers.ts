export interface ParallaxObject {
  targetX: number;
  targetY: number;
  sinOffset: number;
}

export const SPACING_X = 250;
export const SPACING_Y = 250;
export const X_MIN = -500;
export const Y_MIN = -500;
export const X_MAX = 2420;
export const Y_MAX = 1680;
export const RANDOM_OFFSET = 0.5;
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

export const generateObjects = (): ParallaxObject[] => {
  const objects = [];
  for (let x = X_MIN; x < X_MAX; x += SPACING_X) {
    for (let y = Y_MIN; y < Y_MAX; y += SPACING_Y) {
      const targetX = x + Math.random() * RANDOM_OFFSET * SPACING_X;
      const targetY = y + Math.random() * RANDOM_OFFSET * SPACING_Y;
      const sinOffset = Math.random() * Math.PI * 2; // Offset between 0 and 2π
      objects.push({ targetX, targetY, sinOffset });
    }
  }
  return objects;
};

export const screenCenter = (): [number, number] => {
  return [window.innerWidth / 2, window.innerHeight / 2];
};
