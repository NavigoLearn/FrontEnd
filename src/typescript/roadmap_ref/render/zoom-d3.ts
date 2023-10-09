import * as d3 from 'd3';
import {
  setMoveRoadmapTo,
  setRecenterRoadmap,
} from '@store/roadmap-refactor/misc/misc-params-store';
import {
  getScaleSafari,
  setScaleSafariNoSideEffects,
} from '@store/roadmap-refactor/misc/scale-safari-store';
import {
  getNodeByIdRoadmapSelector,
  getRootGlobalId,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { setZoomed } from '@src/to-be-organized/node-rendering-stuff/store-tooltip';

export const calculateRootNodeTransform = () => {
  const rootNode = getNodeByIdRoadmapSelector(getRootGlobalId());
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const x = windowWidth / 2 - rootNode.data.coords.x - rootNode.data.width / 2;
  const y =
    windowHeight / 2 - rootNode.data.coords.y - rootNode.data.height / 2;

  return {
    x: -x,
    y: -y,
    k: 1,
  };
};

export const enableRoadmapZoomDragAndRecenter = (
  rootSvgId: string,
  rootGroupId: string,
  rerender: () => void
) => {
  const svg = d3.select(`#${rootSvgId}`);
  const rootGroup = d3.select(`#${rootGroupId}`);

  function zoomed() {
    rerender();
    this.zoomTransform = d3.zoomIdentity;
    const zoomTransform: d3.ZoomTransform = d3.zoomTransform(this);
    // deactivateToolTip();
    setZoomed(true);

    // @ts-ignore
    rootGroup.attr('transform', zoomTransform);

    setScaleSafariNoSideEffects(zoomTransform.k);
  }

  const zoom = d3
    .zoom()
    .scaleExtent([1 / 3, 2])
    .on('zoom', zoomed);

  svg.call(zoom);
  svg.on('dblclick.zoom', null);

  function resetZoom() {
    const initialTransform = calculateRootNodeTransform();

    const customTransform = d3.zoomIdentity
      .translate(-initialTransform.x, -initialTransform.y)
      .scale(initialTransform.k);
    // @ts-ignore
    svg.transition().duration(750).call(zoom.transform, customTransform);
  }

  function moveRoadmapTo(x: number, y: number, k: number) {
    const currentScale = getScaleSafari();
    const customTransform = d3.zoomIdentity
      .translate(-x, -y)
      .scale(currentScale);
    // @ts-ignore
    svg.transition().duration(750).call(zoom.transform, customTransform);
  }

  setRecenterRoadmap(() => resetZoom());
  setMoveRoadmapTo(moveRoadmapTo);

  d3.select('#recenter-button').on('click', () => resetZoom());

  // ! No longer used
  // d3.select('#zoomin-button').on('click', () => {
  //   svg.transition().duration(250).call(zoom.scaleBy, 1.3);
  // });
  // d3.select('#zoomout-button').on('click', () => {
  //   svg.transition().duration(250).call(zoom.scaleBy, 0.7);
  // });
};

export const disableRoadmapDragZoomAnd = (rootSvgId = 'rootSvg') => {
  const svg = d3.select(`#${rootSvgId}`);
  svg.on('.zoom', null);
};
