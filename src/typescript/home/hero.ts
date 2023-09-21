import anime from 'animejs/lib/anime';
import {
  type BaseParams,
  type HeroRotateProps,
  type PopulatedParams,
} from '@type/home/hero-rotate';

export function transferTransforms(
  element1: HTMLElement,
  element2: HTMLElement
) {
  // get the left and top style properties-page from each element
  const element1Position = {
    top: element1.style.top,
    left: element1.style.left,
    width: element1.style.width,
    height: element1.style.height,
  };

  const element2Position = {
    top: element2.style.top,
    left: element2.style.left,
    width: element2.style.width,
    height: element2.style.height,
  };

  // Animate element1 to element2's position
  anime({
    targets: element1,
    left: element2Position.left,
    top: element2Position.top,
    width: element2Position.width,
    height: element2Position.height,
    duration: 500,
    easing: 'easeInOutQuad',
  });

  // Animate element2 to element1's position
  anime({
    targets: element2,
    left: element1Position.left,
    top: element1Position.top,
    width: element1Position.width,
    height: element1Position.height,
    duration: 500,
    easing: 'easeInOutQuad',
  });
}
export function switchPlaces(allowed: any, elem2Id: string) {
  if (!allowed.current) return;
  // eslint-disable-next-line no-param-reassign
  allowed.current = false;

  const elem1Id = 'centerMain';

  const element1 = document.getElementById(elem1Id);
  const element2 = document.getElementById(elem2Id);

  element1.classList.remove('relative');
  element2.classList.remove('relative');

  transferTransforms(element1, element2);

  const element1Img = element1.getElementsByTagName('img')[0];
  const element2Img = element2.getElementsByTagName('img')[0];

  setTimeout(() => {
    [element1.onclick, element2.onclick] = [element2.onclick, element1.onclick];
    [element1.id, element2.id] = [element2.id, element1.id];
    element1.classList.remove('mainTarget');
    element2.classList.add('mainTarget');
    element2.classList.remove('smallTarget');
    element1.classList.add('smallTarget');
    // switch inner image ids
    [element1Img.id, element2Img.id] = [element2Img.id, element1Img.id];
    // eslint-disable-next-line no-param-reassign
    allowed.current = true;
  }, 500);
}

function calculateCoords(
  length: number,
  idx: number,
  width: number,
  height: number,
  radius: number
): { x: number; y: number } {
  // Calculate the angle in radians
  const angle = ((2 * Math.PI) / length) * idx;
  // Calculate the x and y coordinates
  const x = radius * Math.cos(angle) - width / 2;
  const y = radius * Math.sin(angle) - height / 2;

  return { x, y };
}

export function calculateCoordFactory(
  length: number,
  width: number,
  height: number,
  radius: number
): (idx: number) => { x: number; y: number } {
  return (idx: number) => calculateCoords(length, idx, width, height, radius);
}

export function populateParams(baseParams: BaseParams, props: HeroRotateProps) {
  const { scale, animSpeed } = props;
  return {
    scale,
    width: baseParams.width * scale,
    height: baseParams.height * scale,
    duration: baseParams.duration * (1 / animSpeed),
    widthRotatingImages:
      baseParams.width * scale * baseParams.rotatingImagesPercent,
    heightRotatingImages:
      baseParams.height * scale * baseParams.rotatingImagesPercent,
    widthCenterImage: baseParams.width * scale * baseParams.centerImagePercent,
    heightCenterImage:
      baseParams.height * scale * baseParams.centerImagePercent,
  };
}

export function initializeImgCenter(imgId: string, params: PopulatedParams) {
  const mainImg = document.getElementById(imgId);
  const imgParams = {
    width: params.widthCenterImage,
    height: params.heightCenterImage,
  };

  mainImg.style.width = `${imgParams.width}px`;
  mainImg.style.height = `${imgParams.height}px`;
  mainImg.style.left = `${-imgParams.width / 2}px`;
  mainImg.style.top = `${-imgParams.height / 2}px`;
  mainImg.style.position = 'absolute';
}

export function arrangeImagesAndSetOnclick(
  baseArr: string[],
  params: PopulatedParams,
  allowed: any
) {
  const calculateCoord = calculateCoordFactory(
    baseArr.length,
    params.widthRotatingImages,
    params.heightRotatingImages,
    (params.width * 7) / 16
  );
  baseArr.forEach((el, idx) => {
    const elRef = document.getElementById(el);
    elRef.style.position = 'absolute';
    // the elements can be positioned relative to the center of the element
    elRef.style.height = `${params.heightRotatingImages}px`;
    elRef.style.width = `${params.widthRotatingImages}px`;

    const coords = calculateCoord(idx);
    elRef.style.top = `${coords.x}px`;
    elRef.style.left = `${coords.y}px`;

    elRef.onclick = () => {
      switchPlaces(allowed, el);
    };
  });
}
