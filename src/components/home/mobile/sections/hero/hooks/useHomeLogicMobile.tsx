import { useMemo, useEffect, useRef, useState } from 'react';
import { generateObjectsMobile } from '@components/home/typescript/helpers';

const sinTable = new Array(720)
  .fill(0)
  .map((_, i) => Math.sin((i * Math.PI) / 180));

const useHomeLogicMobile = () => {
  const nodes = useMemo(
    () =>
      generateObjectsMobile({
        startX: 0,
        startY: 0,
        endX: 500,
        endY: 200,
        randomOffset: 1,
        spacingX: 150,
        spacingY: 100,
      }),
    []
  );
  const [parallaxNodes, setParallaxNodes] = useState(nodes);

  useEffect(() => {
    const floatingEffect = 25;
    let animationFrameId = null;
    let TIME = 0;

    const animate = () => {
      setParallaxNodes(
        parallaxNodes.map((node) => {
          const sinIndex = Math.floor(node.sinOffset + TIME) % 720;
          const targetY = node.targetY + sinTable[sinIndex] * floatingEffect;

          return {
            ...node,
            targetY,
            sinOffset: sinIndex,
          };
        })
      );

      TIME += 1;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { parallaxNodes };
};

export default useHomeLogicMobile;
