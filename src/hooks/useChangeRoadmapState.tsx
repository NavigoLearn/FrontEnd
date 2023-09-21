import { useEffect } from 'react';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { useStore } from '@nanostores/react';

export function useChangeRoadmapState(func: () => void, dependencies: any[]) {
  const { roadmapState } = useStore(roadmapStateStore);
  useEffect(() => {
    func();
  }, [roadmapState, ...dependencies]);
}
