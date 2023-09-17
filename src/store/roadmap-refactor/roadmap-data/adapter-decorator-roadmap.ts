import { IRoadmapApi } from '@src/types/explore_old/card';
import { isRoadmapType } from '@src/types/roadmap/old/typecheckers';
import { IRoadmap, IRoadmapData } from '@src/types/roadmap/stores/IRoadmap';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';
import { TemplateNode } from '@src/typescript/roadmap_ref/node/templates-system/template-core';
import { HashMap } from '@src/types/roadmap/misc';

type AdapterFunction<T> = (rawData: any) => T;

export const adaptRawRoadmapData = (data: IRoadmap) => {
  const adaptedData: IRoadmap = {
    rootNodesIds: data.rootNodesIds,
    nodes: data.nodes,
    connections: data.connections,
    chunks: data.chunks,
    data: data.data,
    templates: data.templates,
  };
  return adaptedData;
};

export function roadmapAdapterDecorator<T extends any[]>(
  setterFunc: AdapterFunction<void>
): (...args: T) => void {
  return (...args: T) => {
    const rawData = args[0];
    // Adapt the rawData to the structure of IRoadmapApi
    const adaptedRoadmapData = adaptRawRoadmapData(rawData.data);

    const adaptedData: IRoadmapApi = {
      ...rawData,
      id: rawData.id,
      userId: rawData.userId,
      name: rawData.name,
      likeCount: rawData.likeCount,
      viewCount: rawData.viewCount,
      description: rawData.description,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
      isPublic: rawData.isPublic,
      isLiked: rawData.isLiked,
      isDraft: rawData.isDraft,
      data: adaptedRoadmapData,
      miscData: rawData.miscData,
    };

    // Call the setterFunc with the adapted data
    setterFunc(adaptedData);
  };
}
