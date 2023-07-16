import React from 'react';
import { useStore } from '@nanostores/react';
import displayStore, {
  IDisplayPageType,
} from '@store/roadmap-refactor/display/display-manager';
import EditorPageManager from '@components/roadmap/displayers/editor/EditorPageManager';

const DisplayManager = () => {
  const { type } = useStore(displayStore);

  function renderTab(pageType: IDisplayPageType) {
    const pageDisplayMapper: {
      [key in IDisplayPageType]: JSX.Element;
    } = {
      editor: <EditorPageManager />,
      tab: <div />,
      issues: <div />,
      about: <div />,
      closed: <div />,
    };
    return pageDisplayMapper[pageType];
  }

  return <>{renderTab(type)}</>;
};

export default DisplayManager;
