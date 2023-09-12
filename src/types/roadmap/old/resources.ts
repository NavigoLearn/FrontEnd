import { LevelTypes } from '@type/roadmap/old/level-types';

export type ResourcesStoreTypesIdentifiers = 'ResourceSubNode';

export interface ResourceSubNodeProps {
  id: string;
  parentId: string;
  type: 'ResourceSubNode';
  title: string;
  tabId: string;
  level: LevelTypes;
}

export interface ResourceSubNodeStore {
  id: string;
  level: LevelTypes;
  parentId: string;
  type: ResourcesStoreTypesIdentifiers;
  title: string;
  tabId: string;
}

export type ResourcesStoreTypes = ResourceSubNodeStore;
