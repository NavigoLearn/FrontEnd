import { useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  exploreQueryStore,
  setExploreQuery,
} from '@src/components/explore/stores/explore-query-store';
import { useInputExpansion } from './useInputExpansion';
import { useClearSearch } from './useClearSearch';
import { useSubmit } from './useSubmit';

export function useSearchLogic(handleSearchClick: () => void) {
  const [focus, setFocus] = useState(false);
  const { params } = useStore(exploreQueryStore);
  const { query } = params;

  const { inputExpanded, controls, handleLoupeClick } =
    useInputExpansion(handleSearchClick);

  const { rerender, handleClearSearch } = useClearSearch(
    setExploreQuery,
    query
  );

  const [isExplorePage, setIsExplorePage] = useState(false);

  const { handleSubmit } = useSubmit(isExplorePage, query, setIsExplorePage);

  const handleBlur = () => {
    setFocus(false);
  };

  return {
    inputExpanded,
    controls,
    focus,
    isExplorePage,
    query,
    handleLoupeClick,
    rerender,
    handleClearSearch,
    handleSubmit,
    handleBlur,
    setFocus,
    setExploreQuery,
  };
}
