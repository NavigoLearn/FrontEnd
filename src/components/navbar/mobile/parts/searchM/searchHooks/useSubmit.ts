import { useEffect } from 'react';
import { setExploreQuery } from '@src/components/explore/stores/explore-query-store';
import { useTriggerRerender } from '@src/hooks/useTriggerRerender';

export function useSubmit(
  isExplorePage: boolean,
  query: string,
  setIsExplorePage: (value: boolean) => void
) {
  const rerender = useTriggerRerender();

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

  return {
    handleSubmit,
  };
}
