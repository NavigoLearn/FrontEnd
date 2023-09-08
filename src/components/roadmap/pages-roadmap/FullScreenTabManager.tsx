import React from 'react';
import { useStore } from '@nanostores/react';
import displayManagerStoreFullScreen from '@src/store/roadmap-refactor/display/display-manager-full-screen';
import SetupScreen from './setup-screen/SetupScreen';
import AboutRenderer from '../to-be-organized/about/AboutRenderer';

type Props = {
  isCreate: boolean;
};

const FullScreenTabManager = ({ isCreate }: Props) => {
  const { type } = useStore(displayManagerStoreFullScreen);

  return (
    <>
      {isCreate && <SetupScreen isCreate={isCreate} />}
      {type === 'about' && <AboutRenderer />}
    </>
  );
};

export default FullScreenTabManager;
