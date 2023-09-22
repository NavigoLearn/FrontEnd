import { type ResourceSubNodeProps } from '@type/roadmap/old/resources';
import { type LevelTypes } from '@type/roadmap/old/level-types';

export type NodeIdentifierTypes = 'Info' | 'Resource';
export const nodeIdentifierTypesArray = ['Info', 'Resource'];

export interface NodeStore {
  id: string;
  title: string;
  type: NodeIdentifierTypes;
  x: number;
  y: number;
  parent: string;
  children: string[];
  chunk: string;
  level: LevelTypes;
  connections: string[];
}

export interface NodeInfoProps {
  editing?: boolean;
  editingNode?: boolean;
  level: LevelTypes;
  id: string;
  title: string;
  tabId: string;
}

export interface NodeResourceProps {
  id: string;
  level: LevelTypes;
  title: string;
  nodes: ResourceSubNodeProps[];
}

export interface NodeInfoStore extends NodeStore {
  tabId: string;
}

export interface NodeResourceStore extends NodeStore {
  nodes: string[];
}

export type NodeTypesProps = NodeInfoProps | NodeResourceProps;
export type NodeTypesStore = NodeInfoStore | NodeResourceStore;
