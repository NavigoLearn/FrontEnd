import * as d3 from 'd3';
import roadmapStatic from '@store/roadmap/data/roadmap_static';
import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import roadmapState from '@store/roadmap/data/roadmap_state';
import { calculateMiddleOfNodeOffsetStatic } from '@src/typescript/roadmap_ref/render/coord-calc';
import { setRecenterRoadmap } from '@store/roadmap-refactor/misc/miscParams';
import { setScaleSafari } from '@store/roadmap-refactor/misc/scale-safari';
import { setDisplayTitlesFalse } from '@store/roadmap/sidebar/displayTitle';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';

export const calculateRootNodeTransform = () => {
  const { editing } = roadmapState.get();

  const a = 'sefarw';
  const original = editing ? roadmapEdit.get() : roadmapStatic.get();

  const { nodes } = original;
  const rootNode = nodes.rootNodeId;
  const { x, y } = rootNode;
  const { x: widthNode, y: heightNode } =
    calculateMiddleOfNodeOffsetStatic(rootNode);

  // gets the current screen size
  const { innerWidth, innerHeight } = window;
  // calculates a transform that centers the root node in the middle of the screen
  return {
    x: x - innerWidth / 2 + widthNode / 2,
    y: y - innerHeight / 2 + heightNode / 2 + 100,
    k: 1,
  };
};

export const addZoom = (rootSvgId, rootGroupId, rerender) => {
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

  setRecenterRoadmap(() => resetZoom());
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

export const a = 0;
