import { atom } from 'nanostores';

export type IDisplayStyles = 'right' | 'rightExtended' | 'fullScreen';
export type IDisplayPageType = 'editor' | 'issues' | 'about' | 'tab' | 'closed';
const displayManagerStore = atom({
  // holds roadmap-data about the currently displayed TAB
  type: 'editor', //  type of tab opened
} as {
  type: IDisplayPageType;
});

export default displayManagerStore;
