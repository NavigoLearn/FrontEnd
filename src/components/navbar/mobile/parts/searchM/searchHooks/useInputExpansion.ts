import { useState } from 'react';
import { useAnimation } from 'framer-motion';

export function useInputExpansion(handleSearchClick: () => void) {
  const [inputExpanded, setInputExpanded] = useState(false);
  const controls = useAnimation();

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

  return {
    inputExpanded,
    controls,
    handleLoupeClick,
  };
}
