export const effectOpacity60ForeignDiv = (divElementRef: HTMLDivElement) => {
  divElementRef.style.opacity = '0.6';
};
export const effectOpacity30ForeignDiv = (divElementRef: HTMLDivElement) => {
  divElementRef.style.opacity = '0.3';
};

export const effectOpacity100ForeignDiv = (divElementRef: HTMLDivElement) => {
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

export const effectBorderAnimated = (divElementRef: HTMLDivElement) => {
  divElementRef.style.animation = 'dash 2s infinite linear';
};

export const effectBorderBlueForeignDiv = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid blue';
};

export const effectBorderYellow = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid yellow';
};

export const effectBorderRedForeignDiv = (divElementRef: HTMLDivElement) => {
  divElementRef.style.border = '2px solid red';
};

export const effectOpacity60Native = (
  rectElementRef: SVGRectElement,
  gRef: SVGGElement
) => {
  gRef.setAttribute('opacity', '0.6');
};

export const effectOpacity30Native = (
  rectElementRef: SVGRectElement,
  gRef: SVGGElement
) => {
  rectElementRef.setAttribute('opacity', '0.3');
};
export const effectOpacity100Native = (
  rectElementRef: SVGRectElement,
  gRef: SVGGElement
) => {
  rectElementRef.setAttribute('opacity', '1');
};

export const effectBorderBlueNative = (
  rectElementRef: SVGRectElement,
  gRef: SVGGElement
) => {
  rectElementRef.setAttribute('stroke', 'blue');
  rectElementRef.setAttribute('stroke-width', '2');
};

export const effectBorderRedNative = (
  rectElementRef: SVGRectElement,
  gRef: SVGGElement
) => {
  rectElementRef.setAttribute('stroke', 'red');
  rectElementRef.setAttribute('stroke-width', '2');
};
