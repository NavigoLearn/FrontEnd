export type Viewport = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scale: number;
};

export type ViewportCoord = {
  viewport: Viewport;
  cb: (newViewport: Viewport) => void;
};
