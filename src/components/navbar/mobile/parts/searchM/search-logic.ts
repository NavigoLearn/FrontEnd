import { useState, useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import {
  exploreQueryStore,
  setExploreQuery,
} from '@src/components/explore/stores/explore-query-store';
import { useStore } from '@nanostores/react';
import { useTriggerRerender } from '@src/hooks/useTriggerRerender';

export function useSearchLogic(handleSearchClick: () => void) {
  const [inputExpanded, setInputExpanded] = useState(false);
  const controls = useAnimation();
  const [focus, setFocus] = useState(false);
  const [isExplorePage, setIsExplorePage] = useState(false);
  const { params } = useStore(exploreQueryStore);
  const { query } = params;

  const handleLoupeClick = (e) => {
    const LOUPE_WIDTH = 80;
    handleSearchClick();
    e.stopPropagation();
    setInputExpanded((prev) => !prev);
    if (inputExpanded) {
      controls.start({
        width: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        border: '1px',
      });
    } else {
      // Expand the input to fill the remaining screen width minus loupe width
      const SCREEN_WIDTH = window.innerWidth;
      const NEW_WIDTH = `${SCREEN_WIDTH - LOUPE_WIDTH}px`;

      controls.start({
        width: NEW_WIDTH,
        paddingLeft: '8px',
        paddingRight: '28px', // Adjust for the 'x' button
        paddingTop: '2px',
        paddingBottom: '2px',
        border: '0px',
      });
    }
  };

  const rerender = useTriggerRerender();

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setExploreQuery({ query: '' });
    rerender();
  };

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const isExplore = location.pathname.startsWith('/explore');
    setIsExplorePage(isExplore);

    if (!isExplore) return;
    try {
      // @ts-ignore
      // eslint-disable-next-line no-restricted-globals
      setExploreQuery(decodeURI(location.hash?.slice(1) || ''));
      setExploreQuery({ query });
      rerender();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = () => {
    // if not on explore page, then redirect to explore page
    if (!isExplorePage) {
      // eslint-disable-next-line no-restricted-globals
      location.href = `/explore#${encodeURI(query)}`;
    }
  };

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
