import React from 'react';
import {
  IColorThemesColors,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';
import { selectNodeColorScheme } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { colorThemes } from '@src/typescript/roadmap_ref/node/core/factories/params/params';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { mutateNodeColor } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { triggerRerenderEditor } from '@src/store/roadmap-refactor/elements-editing/editor-selected-data';

type IVariantsComponentProps = {
  selectedColor: IColorThemesColors;
  selectedTheme: IColorThemesOptions;
  node: NodeClass;
};

const VariantsComponent = ({
  selectedColor,
  selectedTheme,
  node,
}: IVariantsComponentProps) => {
  const themeDetails = colorThemes[selectedTheme];

  return (
    <div className='flex flex-row'>
      {Object.keys(themeDetails).map((colorKey: IColorThemesColors) => (
        <button
          key={colorKey}
          type='button'
          style={{
            backgroundColor: themeDetails[colorKey].nodeColor,
            width: '4.5rem',
            height: '2rem',
            marginRight: '0.3rem',
            borderRadius: '0.25rem',
            borderColor: selectedColor === colorKey ? 'black' : 'gray-400',
            borderWidth: selectedColor === colorKey ? '2px' : '1px',
          }}
          onClick={() => {
            mutateNodeColor(node, colorKey);
            triggerRerenderEditor();
          }}
        >
          <div />
        </button>
      ))}
    </div>
  );
};

export default VariantsComponent;
