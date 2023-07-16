import React, { useEffect, useState } from 'react';
import { useToolTip } from '@store/roadmap-refactor/misc/miscParams';
import { setTriggerTooltip } from '@store/roadmap-refactor/render/rerenderTriggers';
import { useStore } from '@nanostores/react';
import scaleSafari from '@store/roadmap-refactor/misc/scale-safari';

const Tooltip = ({ id }: { id: string }) => {
  // get the scale from the store (throttled, so a better way should be found)
  const { scale } = useStore(scaleSafari);

  const isSafari =
    navigator.userAgent.indexOf('Safari') !== -1 &&
    navigator.userAgent.indexOf('Chrome') === -1;

  // render-roadmap-roadmap-data tells if the tooltip should be rendered again
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTriggerTooltip(id, () => {
      setRender((prevState) => !prevState);
    });
  }, []);

  // gets current tooltip that should be displayed
  const options = useToolTip(id);
  if (!options) return null;

  return (
    <div
      className='fixed bottom-0 w-full'
      style={
        isSafari
          ? {
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }
          : {}
      } // this is a hack to make the tooltip work in safari
    >
      {options()}
    </div>
  );
};

export default Tooltip;
