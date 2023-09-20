import React, { useState } from 'react';
import { useAnimation } from 'framer-motion';
import NodeConfigurations from '@components/home/desktop/constants/node-configs';
import { useTimer } from '@components/home/desktop/hooks/useTimer';

type ButtonType = 'sizing' | 'colors' | 'interior';

interface Props {
  children: React.ReactNode;
}

export interface BottomSectionStateProps {
  selectedButton: string | null;
  primaryNodeText: string;
  secondaryNodesOpacity: number;
  interiorNodeOpacity: number;
  interiorNodeText: string;
  subNodeOpacity: number;
  secondaryNodeColor: string;
  secondaryNodeText: string;
  controls: any;
  resetNodesToDefault: () => void;
  startResetTimer: () => void;
  handleButtonPress: (type: ButtonType) => void;
}
const BottomSectionState: React.FC = ({ children }: Props) => {
  const controls = useAnimation();
  const [state, setState] = useState<BottomSectionStateProps>({
    selectedButton: null,
    primaryNodeText: 'Primary node',
    secondaryNodesOpacity: 1,
    interiorNodeOpacity: 0,
    interiorNodeText: 'Secondary node with sub nodes',
    subNodeOpacity: 1,
    secondaryNodeColor: 'bg-white text-secondary',
    secondaryNodeText: 'Secondary node',
    controls,
    resetNodesToDefault: () => {},
    startResetTimer: () => {},
    handleButtonPress: () => {},
  });

  const resetNodesToDefault = (): BottomSectionStateProps => {
    const newState = {
      ...state,
      selectedButton: null,
      primaryNodeText: NodeConfigurations.PRIMARY_NODE,
      secondaryNodesOpacity: 1,
      interiorNodeOpacity: 0,
      interiorNodeText: NodeConfigurations.SECONDARY_NODE_WITH_SUB_NODES,
      subNodeOpacity: 1,
      secondaryNodeColor: NodeConfigurations.BG_WHITE_TEXT_SECONDARY,
      secondaryNodeText: NodeConfigurations.SECONDARY_NODE,
    };

    setState(newState);
    controls.stop();
    controls.start({
      height: '32px',
      opacity: 1,
    });

    return newState;
  };

  const [startResetTimer] = useTimer(resetNodesToDefault, 5000);

  const handleButtonPress = (type: ButtonType) => {
    let copyState = resetNodesToDefault();

    copyState = {
      ...copyState,
      secondaryNodesOpacity: 0.4,
      interiorNodeOpacity: 0,
      subNodeOpacity: 0.4,
    };
    switch (type) {
      case 'sizing':
        copyState.selectedButton = 'sizing';
        copyState.primaryNodeText = NodeConfigurations.MY_SIZE_CHANGED;
        controls.start({ height: '120px', opacity: 1 });
        break;
      case 'colors':
        copyState.selectedButton = 'colors';
        copyState.secondaryNodeColor =
          NodeConfigurations.BG_DARK_BLUE_TEXT_WHITE;
        copyState.secondaryNodeText = NodeConfigurations.COLORS_CHANGED;
        copyState.secondaryNodesOpacity = 1;
        controls.stop();
        controls.start({ height: '32px', opacity: 0.4 });
        break;
      case 'interior':
        copyState.selectedButton = 'interior';
        copyState.secondaryNodesOpacity = 0.4;
        copyState.subNodeOpacity = 1;
        copyState.interiorNodeOpacity = 1;
        copyState.interiorNodeText = NodeConfigurations.INTERIOR_CHANGES;
        controls.stop();
        controls.start({ height: '32px', opacity: 0.4 });
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('Invalid button type', type);
        break;
    }
    startResetTimer();
    setState(copyState);
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        // @ts-ignore
        React.cloneElement(child, {
          ...state,
          handleButtonPress,
        } as BottomSectionStateProps)
      )}
    </div>
  );
};

export default BottomSectionState;
