export interface ParallaxObject {
  targetX: number;
  targetY: number;
  sinOffset: number;
  cosOffset: number;
}

export const SPACING_X = 150;
export const SPACING_Y = 150;
export const X_MIN = -200;
export const Y_MIN = -200;
export const X_MAX = 2120;
export const Y_MAX = 1280;
export const RANDOM_OFFSET = 0.5;

export const lerp = (
  current: number,
  target: number,
  speed: number
): number => {
  return current + speed * (target - current);
};

export const generateObjects = (): ParallaxObject[] => {
  const objects = [];
  for (let x = X_MIN; x < X_MAX; x += SPACING_X) {
    for (let y = Y_MIN; y < Y_MAX; y += SPACING_Y) {
      const targetX = x + Math.random() * RANDOM_OFFSET * SPACING_X;
      const targetY = y + Math.random() * RANDOM_OFFSET * SPACING_Y;
      const sinOffset = Math.random() * Math.PI * 2; // Offset between 0 and 2π
      const cosOffset = Math.random() * Math.PI * 2;
      objects.push({ targetX, targetY, sinOffset, cosOffset });
    }
  }
  return objects;
};

export const screenCenter = (): [number, number] => {
  return [window.innerWidth / 2, window.innerHeight / 2];
};
