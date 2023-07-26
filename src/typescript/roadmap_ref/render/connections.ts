import * as d3 from 'd3';
import renderConnectionsStore from '@store/roadmap-refactor/render/renderedConnections';
import roadmapState from '@store/roadmap/data/roadmap_state';
import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import roadmapStatic from '@store/roadmap/data/roadmap_static';
import { ConnectionStore } from '@type/roadmap/old/connections';
import selection from '@store/roadmap-refactor/render/selection';
import {
  calculateCoordOfNodeStatic,
  getNodeMiddleCoordsFlow,
} from '@src/typescript/roadmap_ref/render/coord-calc';

export function renderConnections() {
  const renderConns = renderConnectionsStore.get();
  const { connections: connIds } = renderConns;
  const { editing } = roadmapState.get();
  const original = editing ? roadmapEdit.get() : roadmapStatic.get();
  const { connections } = original;

  function getConnWidth(conn: ConnectionStore) {
    const { parentId, childId } = conn;
    if (
      original.nodes[parentId].level === 'main' &&
      original.nodes[childId].level === 'main'
    )
      return 4;
    return 2;
  }
  function getConnColor(conn: ConnectionStore) {
    const { parentId, childId } = conn;
    if (
      original.nodes[parentId].level === 'main' &&
      original.nodes[childId].level === 'main'
    )
      return '#0092ff';
    return '#000000';
  }

  // creates an array from the nodes json object
  const connectionArray: ConnectionStore[] = connIds.map(
    (key) => connections[key]
  );

  const g = document.getElementById('rootGroupConnections');
  const nodeSelection = d3
    .select(g)
    .selectAll('line')
    .data(connectionArray, (d) => {
      return d.id;
    }); // Use the roadmap-roadmap-data value as the key function
  // calculates the middle of the node for each node
  // we append line objects
  nodeSelection
    .enter()
    .append('line')
    .attr('id', (d: ConnectionStore) => d.id)
    .attr('x1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).x)
    .attr('y1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).y)
    .attr('x2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).x)
    .attr('y2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).y)
    .attr('stroke', (d: ConnectionStore) => getConnColor(d))
    .attr('stroke-width', (d: ConnectionStore) => getConnWidth(d));

  // this should happen only in elements-editing mode when a node is moving
  nodeSelection
    .attr('id', (d: ConnectionStore) => d.id)
    .attr('x1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).x)
    .attr('y1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).y)
    .attr('x2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).x)
    .attr('y2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).y)
    .transition()
    .duration(200)

    .attr('stroke', (d: ConnectionStore) => getConnColor(d))
    .attr('stroke-width', (d: ConnectionStore) => getConnWidth(d));

  nodeSelection.exit().remove();
}

export function renderConnectionsSelected(connIds: string[]) {
  const { editing } = roadmapState.get();
  const original = editing ? roadmapEdit.get() : roadmapStatic.get();
  const { connections } = original;

  function getConnWidth(conn: ConnectionStore) {
    const { parentId, childId } = conn;
    if (
      original.nodes[parentId].level === 'main' &&
      original.nodes[childId].level === 'main'
    )
      return 4;
    return 2;
  }
  function getConnColor(conn: ConnectionStore) {
    const { parentId, childId } = conn;
    if (
      original.nodes[parentId].level === 'main' &&
      original.nodes[childId].level === 'main'
    )
      return '#0092ff';
    return '#000000';
  }

  // creates an array from the nodes json object
  const connectionArray: ConnectionStore[] = connIds.map(
    (key) => connections[key]
  );

  const g = document.getElementById('rootGroupConnections');
  const nodeSelection = d3
    .select(g)
    .selectAll('line')
    .data(connectionArray, (d) => {
      return d.id;
    }); // Use the roadmap-roadmap-data value as the key function
  // calculates the middle of the node for each node
  // we append line objects
  nodeSelection
    .enter()
    .append('line')
    .attr('id', (d: ConnectionStore) => d.id)
    .attr('x1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).x)
    .attr('y1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).y)
    .attr('x2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).x)
    .attr('y2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).y)
    .attr('stroke', 'black')
    .attr('stroke-width', (d: ConnectionStore) => getConnWidth(d));

  // this should happen only in elements-editing mode when a node is moving
  nodeSelection
    .attr('id', (d: ConnectionStore) => d.id)
    .attr('x1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).x)
    .attr('y1', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.parentId).y)
    .attr('x2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).x)
    .attr('y2', (d: ConnectionStore) => getNodeMiddleCoordsFlow(d.childId).y)
    .attr('stroke', 'black')
    .attr('stroke-width', (d: ConnectionStore) => getConnWidth(d));

  nodeSelection.exit().remove();
}
export function updateConnections() {
  // called when a node is moved via dragging
  const { adjacentConnectionsId: connIds } = selection.get();
  const { connections } = roadmapEdit.get();
  // creates an array from the nodes json object
  const connectionArray: ConnectionStore[] = connIds.map(
    (key) => connections[key]
  );

  const g = document.getElementById('rootGroupConnections');
  const nodeSelection = d3
    .select(g)
    .selectAll('line')
    .data(connectionArray, (d) => {
      return d.id;
    }); // Use the roadmap-roadmap-data value as the key function

  // calculates the new positions based on the new node positions
  nodeSelection

    .attr(
      'x1',
      (d: ConnectionStore) => calculateCoordOfNodeStatic(d.parentId).x
    )

    .attr(
      'y1',
      (d: ConnectionStore) => calculateCoordOfNodeStatic(d.parentId).y
    )
    .attr('x2', (d: ConnectionStore) => calculateCoordOfNodeStatic(d.childId).x)
    .attr(
      'y2',
      (d: ConnectionStore) => calculateCoordOfNodeStatic(d.childId).y
    );
}
