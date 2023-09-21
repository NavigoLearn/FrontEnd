import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  getRenderedRootNodesIds,
  setNodes,
} from '@store/roadmap-refactor/render/rendered-nodes';
import chunksStore, {
  setChunks,
} from '@store/roadmap-refactor/render/rendered-chunks';
import * as d3 from 'd3';
import { setConnections } from '@store/roadmap-refactor/render/rendered-connections';
import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { setViewport } from '@store/roadmap-refactor/misc/viewport-coords-store';
import { type Viewport } from '@type/roadmap/old/misc';
import miscParams from '@store/roadmap-refactor/misc/misc-params-store';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { getRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';

export function setConnectionsToRender() {
  const { loaded } = roadmapStateStore.get();
  const roadmap = roadmapSelector.get();
  if (!loaded) return;
  const connectionsIds = []; // array of all the connections that should be rendered
  const nodes = getRenderedRootNodesIds();
  // gets the connections for each node
  nodes.forEach((nodeId) => {
    const node = roadmap.nodes[nodeId];
    if (node.connections !== undefined) {
      connectionsIds.push(...node.connections);
    } else {
      throw new Error('node.connections is undefined');
    }
  });
  setConnections(connectionsIds);
}

function extendNodeIdsForConnection(nodeIds, roadmap: IRoadmap) {
  // extends the node ids array to include the nodes-page that are connected to the nodes-page in the array
  const extendedNodeIds = [...nodeIds];
  nodeIds.forEach((nodeId) => {
    const node = roadmap.nodes[nodeId];
    if (node.connections !== undefined) {
      node.connections.forEach((connectionId) => {
        const connection = roadmap.connections[connectionId];
        const { from, to } = connection as ConnectionClass;
        if (!extendedNodeIds.includes(from)) extendedNodeIds.push(from);
        if (!extendedNodeIds.includes(to)) extendedNodeIds.push(to);
      });
    }
  });
  return extendedNodeIds;
}

export function setNodesToRender() {
  const { loaded } = roadmapStateStore.get();
  if (!loaded) return;

  const roadmapData: IRoadmap = getRoadmapSelector();

  const { chunks } = roadmapData;

  const chunksIds = chunksStore.get().chunks;

  let nodesArray: string[] = [];
  chunksIds.forEach((chunkId) => {
    // gets the array of nodes-page for each chunk id
    const nodes = chunks[chunkId];
    if (nodes !== undefined) {
      nodesArray.push(...nodes);
    }
  });
  // eliminates duplicates
  nodesArray = [...new Set(nodesArray)];

  nodesArray = extendNodeIdsForConnection(nodesArray, roadmapData);
  // sets the nodes-page that should be rendered ( calculated from the chunks visible )
  setNodes(nodesArray);
}

export function calculateViewportCoordinates(transform: any) {
  // Get the SVG element and its dimensions
  const svg = d3.select('#rootSvg');

  // @ts-ignore
  const svgBoundingClientRect = svg.node().getBoundingClientRect();
  const { width, height } = svgBoundingClientRect;

  const viewportX = -transform.x / transform.k;
  const viewportY = -transform.y / transform.k;

  // Calculate the current viewport width and height
  const viewportWidth = width / transform.k;
  const viewportHeight = height / transform.k;

  const viewport: Viewport = {
    startX: viewportX,
    startY: viewportY,
    endX: viewportX + viewportWidth,
    endY: viewportY + viewportHeight,
    scale: transform.k,
  };

  setViewport(viewport);

  return viewport;
}

export function calculateRenderedChunks(
  transform: { k: number; x: number; y: number },
  chunkSize: number
) {
  // calculate the chunks that should be rendered on the current viewport
  const viewport = calculateViewportCoordinates(transform);
  // expand the viewport to include the chunks that are partially visible
  const expandedViewport = {
    startX: viewport.startX - chunkSize / 4,
    startY: viewport.startY - chunkSize / 4,
    endX: viewport.endX + chunkSize / 4,
    endY: viewport.endY + chunkSize / 4,
  };
  // we calculate the chunks present on the passed viewport
  const firstChunkCoordX = Math.floor(expandedViewport.startX / chunkSize);
  const firstChunkCoordY = Math.floor(expandedViewport.startY / chunkSize);
  const lastChunkCoordX = Math.floor(expandedViewport.endX / chunkSize);
  const lastChunkCoordY = Math.floor(expandedViewport.endY / chunkSize);

  const renderedChunks = [];
  for (let i = firstChunkCoordX; i <= lastChunkCoordX; i += 1) {
    for (let j = firstChunkCoordY; j <= lastChunkCoordY; j += 1) {
      // enconding the present chunks in the app
      // i and j are the chunk coordinates of the top left corner
      renderedChunks.push(`${i}_${j}`);
    }
  }
  setChunks(renderedChunks); // sets the chunks currently visible
}
export function throttle(func, delay) {
  // throttleing function for optimization purposes
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    func(...args);
  };
}

export function renderChunksFlow(
  transform: { k: number; x: number; y: number },
  chunkSize: number
) {
  calculateRenderedChunks(transform, chunkSize); // calculates chunks from viewport and sets them in the store
  setNodesToRender(); // checks for nodes-page in the chunks and sets them into a store to be rendered
  setConnectionsToRender(); // checks for connections in the chunks and sets them into a store to be rendered
}

export function recalculateChunks(svgRefId: string) {
  const svgRef = document.getElementById(svgRefId);
  const throttledRendering = throttle(renderChunksFlow, 75);
  const { chunkSize } = miscParams.get();

  return () => {
    throttledRendering(d3.zoomTransform(svgRef), chunkSize);
  };
}
