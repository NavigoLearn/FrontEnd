import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import {
  type ConnectionProps,
  type ConnectionStore,
} from '@type/roadmap/old/connections';
import { type ResourceSubNodeProps } from '@type/roadmap/old/resources';
import {
  type LevelTypes,
  levelTypesArray,
} from '@type/roadmap/old/level-types';
import {
  type NodeIdentifierTypes,
  nodeIdentifierTypesArray,
  type NodeInfoProps,
  type NodeInfoStore,
  type NodeResourceProps,
  type NodeResourceStore,
  type NodeStore,
  type NodeTypesStore,
} from './nodes';

export function isNodeInfoProps(props: any): props is NodeInfoProps {
  return (
    'title' in props && 'tabId' in props && 'type' in props && 'level' in props
  );
}

export function isResourceSubNodeProps(
  props: any
): props is ResourceSubNodeProps {
  return 'title' in props && 'tabId' in props && 'type' in props;
}

export function isNodeResourceProps(props: any): props is NodeResourceProps {
  return 'title' in props && 'nodes' in props && 'level' in props;
}

export function isLevelType(props: any): props is LevelTypes {
  return levelTypesArray.includes(props);
}

export function isNodeStore(props: any): props is NodeStore {
  return 'id' in props && 'title' in props && 'type' in props;
}
export function isNodeInfoStore(props: any): props is NodeInfoStore {
  return (
    'title' in props &&
    'type' in props &&
    props.type === 'Info' &&
    'tabId' in props &&
    'x' in props &&
    'y' in props &&
    'id' in props
  );
}

export function isNodeResourceStore(props: any): props is NodeResourceStore {
  return (
    'title' in props &&
    'type' in props &&
    props.type === 'Resource' &&
    'nodes' in props &&
    'x' in props &&
    'y' in props &&
    'id' in props
  );
}

export function isConnectionStore(props: any): props is ConnectionStore {
  return 'id' in props && 'parentId' in props && 'childId' in props;
}

export function isConnectionProps(props: any): props is ConnectionProps {
  return 'id' in props && 'parentId' in props && 'childId' in props;
}

export function isNodeTypesStore(props: any): props is NodeTypesStore {
  return isNodeInfoStore(props) || isNodeResourceStore(props);
}

export function isValidNodeType(type: string): type is NodeIdentifierTypes {
  return nodeIdentifierTypesArray.includes(type);
}

export function isRoadmapType(props: any): props is IRoadmap {
  return 'nodes' in props;
}
