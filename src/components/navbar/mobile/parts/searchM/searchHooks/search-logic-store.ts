import { atom } from 'nanostores';
import type { AnimationControls } from 'framer-motion';
import {
  redirectToExploreWithQuery,
  setExploreQuery,
} from '@components/explore/stores/explore-query-store';

export type ISearchLogicStore = {
  focus: boolean;
  isExplorePage: boolean;
  query: string;
  inputExpanded: boolean;
  controls: AnimationControls | null;
};

export const searchLogicStore = atom<ISearchLogicStore>({
  focus: false,
  isExplorePage: false,
  query: '',
  inputExpanded: false,
  controls: null,
});

export const actions = {
  setFocus: (focus: boolean) => {
    searchLogicStore.set({
      ...searchLogicStore.get(),
      focus,
    });
  },
  setQuery: (query: string) => {
    searchLogicStore.set({
      ...searchLogicStore.get(),
      query,
    });
  },
  setInputExpanded: (inputExpanded: boolean) => {
    searchLogicStore.set({
      ...searchLogicStore.get(),
      inputExpanded,
    });
  },
  setControls: (controls: AnimationControls) => {
    searchLogicStore.set({
      ...searchLogicStore.get(),
      controls,
    });
  },
  handleClearSearch: (e: Event) => {
    e.stopPropagation();
    searchLogicStore.set({
      ...searchLogicStore.get(),
      query: '',
    });
  },
  handleLoupeClick: () => {
    const LOUPE_WIDTH = 100;
    const { controls } = searchLogicStore.get();

    if (controls) {
      if (searchLogicStore.get().inputExpanded) {
        controls.start({
          width: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
          paddingTop: '0px',
          paddingBottom: '0px',
          border: '1px',
          transition: {
            duration: 0,
          },
        });
      } else {
        const SCREEN_WIDTH = window.innerWidth;
        const NEW_WIDTH = `${SCREEN_WIDTH - LOUPE_WIDTH}px`;
        controls.stop();
        controls.start({
          width: NEW_WIDTH,
          paddingLeft: '8px',
          paddingRight: '28px', // Adjust for the 'x' button
          paddingTop: '2px',
          paddingBottom: '2px',
          border: '0px',
          transition: {
            duration: 0.1,
          },
        });
      }
      setTimeout(() => {
        searchLogicStore.set({
          ...searchLogicStore.get(),
          inputExpanded: !searchLogicStore.get().inputExpanded,
        });
      }, 150);
    }
  },
  handleSubmit: (isExplorePage: boolean, query: string) => {
    searchLogicStore.set({
      ...searchLogicStore.get(),
      isExplorePage,
    });
    if (!isExplorePage) {
      redirectToExploreWithQuery(query);
    } else {
      setExploreQuery({ query });
    }
  },
};
