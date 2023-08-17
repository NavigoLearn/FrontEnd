import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import {
  hydrateDraggingBehaviorComponent,
  hydrateDraggingBehaviorNode,
} from '@src/typescript/roadmap_ref/hydration/dragging-hydration';

export function hydrateRoadmap() {
  // hydrates roadmap selector

  const roadmap = roadmapSelector.get();
  const { nodes } = roadmap;
  Object.keys(nodes).forEach((nodeId) => {
    const node = nodes[nodeId];
    // hydrating dragging behavior
    hydrateDraggingBehaviorNode(node);
    // hydrating reusable-components-page
    node.components.forEach((component) => {
      hydrateDraggingBehaviorComponent(component);
    });
  });
}
