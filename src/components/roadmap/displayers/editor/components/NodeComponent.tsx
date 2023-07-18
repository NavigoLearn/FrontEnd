import React from 'react';
import { useStore } from '@nanostores/react';
import roadmapPlaceholder from '@store/roadmap-refactor/roadmap-data/roadmap-placeholder';

const NodeComponent = ({ id }: { id: string }) => {
  const { nodes } = useStore(roadmapPlaceholder);
  const node = nodes[id];

  return <div>{id}</div>;
};

export default NodeComponent;
