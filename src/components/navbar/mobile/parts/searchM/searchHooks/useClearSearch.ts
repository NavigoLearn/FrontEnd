import { useTriggerRerender } from '@src/hooks/useTriggerRerender';

export function useClearSearch(setExploreQuery: any, query: string) {
  const rerender = useTriggerRerender();

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setExploreQuery({ query: '' });
    rerender();
  };

  return {
    rerender,
    handleClearSearch,
  };
}
