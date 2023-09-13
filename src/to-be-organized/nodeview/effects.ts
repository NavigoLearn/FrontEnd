export const effectOpacity60 = (divElementRef: HTMLDivElement) => {
  divElementRef.style.opacity = '0.6';
};
export const effectOpacity30 = (divElementRef: HTMLDivElement) => {
  divElementRef.style.opacity = '0.3';
};

export const effectOpacity100 = (divElementRef: HTMLDivElement) => {
  divElementRef.style.opacity = '1';
};

export const effectBorderBlack = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid black';
};

export const effectBorderTransparent = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid transparent';
};

export const effectBorderBlueDashed = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px dashed blue';
};
export const effectBorderBlue = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid blue';
};

export const effectBorderYellow = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid yellow';
};

export const effectBorderRed = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid red';
};

export const effectOpacity60Rect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('opacity', '0.6');
};
export const effectOpacity30Rect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('opacity', '0.3');
};
export const effectOpacity100Rect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('opacity', '1');
};

export const effectBorderBlackRect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('stroke', 'black');
  rectElementRef.setAttribute('stroke-width', '2');
};

export const effectBorderTransparentRect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('stroke', 'transparent');
  rectElementRef.setAttribute('stroke-width', '2');
};

export const effectBorderBlueDashedRect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('stroke', 'blue');
  rectElementRef.setAttribute('stroke-width', '2');
  rectElementRef.setAttribute('stroke-dasharray', '4,4');
};

export const effectBorderBlueRect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('stroke', 'blue');
  rectElementRef.setAttribute('stroke-width', '2');
};

export const effectBorderYellowRect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('stroke', 'yellow');
  rectElementRef.setAttribute('stroke-width', '2');
};

export const effectBorderRedRect = (rectElementRef: SVGRectElement) => {
  rectElementRef.setAttribute('stroke', 'red');
  rectElementRef.setAttribute('stroke-width', '2');
};
