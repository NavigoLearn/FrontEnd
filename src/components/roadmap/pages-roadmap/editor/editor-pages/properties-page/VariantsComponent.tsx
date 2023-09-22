import React from 'react';
import {
  type IColorThemesColors,
  type IColorThemesOptions,
} from '@type/roadmap/node/colors-types';
import { colorThemes } from '@src/typescript/roadmap_ref/node/core/color-themes';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { mutateNodeColorAndRerender } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import {
  selectNodeColorText,
  selectNodeColorTextBorder,
  selectNodeDefaultOpacity,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { mutateAllComponentsTextOpacity } from '@src/typescript/roadmap_ref/node/components/text/mutate';

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
      {Object.keys(themeDetails).map((colorKey: IColorThemesColors, index) => {
        const borderColor = selectNodeColorTextBorder(selectedTheme, colorKey);
        const defaultOpacity = selectNodeDefaultOpacity(
          selectedTheme,
          colorKey
        );
        // console.log(defaultOpacity);

        const borderStyle =
          borderColor === 'none'
            ? '2px solid transparent'
            : `2px solid #${borderColor}`;

        return (
          <button
            className={`${selectedColor === colorKey ? 'drop-shadow-lg' : ''}`}
            key={colorKey}
            type='button'
            style={{
              backgroundColor: themeDetails[colorKey].nodeColor,
              width: '6.5rem',
              height: '2.2rem',
              marginRight: '0.1rem',
              borderRadius: '0.25rem',
              transition: 'all 100ms ease-in-out',
              padding: '0',
              color: selectNodeColorText(selectedTheme, colorKey),
              fontFamily: 'Roboto, sans-serif',
              borderTopLeftRadius: index === 0 ? '0.25rem' : '0',
              borderBottomLeftRadius: index === 0 ? '0.25rem' : '0',
              borderTopRightRadius:
                index === Object.keys(themeDetails).length - 1
                  ? '0.25rem'
                  : '0',
              borderBottomRightRadius:
                index === Object.keys(themeDetails).length - 1
                  ? '0.25rem'
                  : '0',
              opacity: selectedColor === colorKey ? 1 : 0.6,
              border: borderStyle,
            }}
            onClick={() => {
              // console.log(node.components, defaultOpacity);
              mutateAllComponentsTextOpacity(node.components, defaultOpacity);
              mutateNodeColorAndRerender(node, colorKey);
              triggerRerenderEditor();
            }}
          >
            {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

export default VariantsComponent;
