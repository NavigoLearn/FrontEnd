import { type MouseEvent, useEffect, useRef, useState } from 'react';
import {
  generateObjectsDesktop,
  lerp,
  screenCenter,
} from '@components/home/typescript/helpers';

const sinTable = new Array(720)
  .fill(0)
  .map((_, i) => Math.sin((i * Math.PI) / 180));

const useHomeLogic = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const [parallaxNodes, setParallaxNodes] = useState(generateObjectsDesktop());
  const viewCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const floatingEffect = 25;
    let animationFrameId = null;
    let TIME = 0;

    if (mousePosition.current.x === 0 && mousePosition.current.y === 0) {
      const [x, y] = screenCenter();
      mousePosition.current = {
        x,
        y,
      };
    }

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

  useEffect(() => {
    let animationFrameId = null;

    function animate() {
      // Calculate the distance from the center of the screen
      const [SCREEN_CENTER_X, SCREEN_CENTER_Y] = screenCenter();

      const { x, y } = mousePosition.current;
      const DISTANCE_X = ((x - SCREEN_CENTER_X) / SCREEN_CENTER_X) * 1920;
      const DISTANCE_Y = ((y - SCREEN_CENTER_Y) / SCREEN_CENTER_Y) * 1080;

      viewCoords.current = {
        x: lerp(viewCoords.current.x, DISTANCE_X / 12, 0.2),
        y: lerp(viewCoords.current.y, DISTANCE_Y / 12, 0.2),
      };

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewCoords]);

  // animation logic - update the mouse position
  const handleMouseMove = (e: MouseEvent) => {
    mousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  return { parallaxNodes, viewCoords, handleMouseMove };
};

export default useHomeLogic;
