import * as d3 from 'd3';
import {
  setMoveRoadmapTo,
  setRecenterRoadmap,
} from '@store/roadmap-refactor/misc/miscParams';
import { setScaleSafari } from '@store/roadmap-refactor/misc/scale-safari';
import { setDisplayTitlesFalse } from '@store/roadmap/sidebar/displayTitle';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';
import {
  getNodeByIdRoadmapSelector,
  getRootGlobalId,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export const calculateRootNodeTransform = () => {
  const rootNode = getNodeByIdRoadmapSelector(getRootGlobalId());
  console.log(roadmapSelector.get());
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

export const addZoomAndRecenter = (rootSvgId, rootGroupId, rerender) => {
  const svg = d3.select(`#${rootSvgId}`);
  const rootGroup = d3.select(`#${rootGroupId}`);

  const setTitlesDisplay = throttle(() => {
    setDisplayTitlesFalse();
  }, 400);

  function zoomed() {
    rerender();
    this.zoomTransform = d3.zoomIdentity;
    const zoomTransform = d3.zoomTransform(this);
    rootGroup.attr('transform', zoomTransform);

    setScaleSafari(zoomTransform.k);
    setTitlesDisplay();
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
    svg.transition().duration(750).call(zoom.transform, customTransform);
  }

  function moveRoadmapTo(x: number, y: number, k: number) {
    const customTransform = d3.zoomIdentity.translate(-x, -y).scale(k);
    svg.transition().duration(750).call(zoom.transform, customTransform);
  }

  setRecenterRoadmap(() => resetZoom());
  setMoveRoadmapTo(moveRoadmapTo);

  d3.select('#recenter-button').on('click', () => resetZoom());
  d3.select('#zoomin-button').on('click', () => {
    svg.transition().duration(250).call(zoom.scaleBy, 1.3);
  });
  d3.select('#zoomout-button').on('click', () => {
    svg.transition().duration(250).call(zoom.scaleBy, 0.7);
  });
};

export const disableZoom = (rootSvgId) => {
  const svg = d3.select(`#${rootSvgId}`);
  svg.on('.zoom', null);
};
