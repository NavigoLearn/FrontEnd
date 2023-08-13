import roadmapState from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  getNodes,
  setNodes,
} from '@store/roadmap-refactor/render/rendered-nodes';
import chunksStore, {
  setChunks,
} from '@store/roadmap-refactor/render/rendered-chunks';
import * as d3 from 'd3';
import { setConnections } from '@store/roadmap-refactor/render/rendered-connections';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { setViewport } from '@store/roadmap-refactor/misc/viewport-coords';
import { Viewport } from '@type/roadmap/old/misc';
import miscParams from '@store/roadmap-refactor/misc/miscParams';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export function setConnectionsToRender() {
  const { loaded } = roadmapState.get();
  const roadmap = roadmapSelector.get();
  if (!loaded) return;
  const connectionsIds = []; // array of all the connections that should be rendered
  const nodes = getNodes();
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

export function extendNodeIdsForConnection(nodeIds, roadmap: Roadmap) {
  // extends the node ids array to include the nodes that are connected to the nodes in the array
  const extendedNodeIds = [...nodeIds];
  nodeIds.forEach((nodeId) => {
    const node = roadmap.nodes[nodeId];
    if (node.connections !== undefined) {
      node.connections.forEach((connectionId) => {
        const connection = roadmap.connections[connectionId];
        const { from, to } = connection;
        if (!extendedNodeIds.includes(from)) extendedNodeIds.push(from);
        if (!extendedNodeIds.includes(to)) extendedNodeIds.push(to);
      });
    }
  });
  return extendedNodeIds;
}

export function setNodesToRender() {
  const { editing, loaded } = roadmapState.get();
  if (!loaded) return;

  const roadmapData: Roadmap = roadmapSelector.get();

  const { chunks } = roadmapData;

  const chunksIds = chunksStore.get().chunks;

  let nodesArray: string[] = [];
  chunksIds.forEach((chunkId) => {
    // gets the array of nodes for each chunk id
    const nodes = chunks[chunkId];
    if (nodes !== undefined) {
      nodesArray.push(...nodes);
    }
  });
  // eliminates duplicates
  nodesArray = [...new Set(nodesArray)];

  nodesArray = extendNodeIdsForConnection(nodesArray, roadmapData);
  // sets the nodes that should be rendered ( calculated from the chunks visible )
  setNodes(nodesArray);
}

export function calculateViewportCoordinates(transform: any) {
  // Get the SVG element and its dimensions
  const svg = d3.select('#rootSvg');
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
    startX: viewport.startX - chunkSize / 2,
    startY: viewport.startY - chunkSize / 2,
    endX: viewport.endX + chunkSize,
    endY: viewport.endY + chunkSize,
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
  setNodesToRender(); // checks for nodes in the chunks and sets them into a store to be rendered
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
