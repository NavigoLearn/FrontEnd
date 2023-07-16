import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  arrangeImagesAndSetOnclick,
  initializeImgCenter,
  populateParams,
  switchPlaces,
} from '@typescript/home/hero';
import {
  BaseParams,
  HeroRotateProps,
  PopulatedParams,
} from '@type/home/hero-rotate';
import anime from 'animejs/lib/anime';
import useScrollTop from '@hooks/useScrollTop';

const HeroRotate = ({ scale, animSpeed }: HeroRotateProps) => {
  const [set, setSet] = useState(false);
  useScrollTop();
  const rootRef = useRef<HTMLDivElement>(null);
  const allowed = useRef(true);
  const centerSrc = '/home/nextjs.svg';
  const baseArr: string[] = [
    '/home/cpp.png',
    '/home/csharp.png',
    '/home/css.png',
    '/home/html.png',
    '/home/javascript.svg',
    '/home/python.png',
    '/home/pytorch.png',
    '/home/react.svg',
    '/home/typescript.svg',
  ];

  const baseParams: BaseParams = {
    width: 800,
    height: 800,
    rotatingImagesPercent: 0.09,
    centerImagePercent: 0.4,
    duration: 20000,
  };
  const params: PopulatedParams = useMemo(
    () =>
      populateParams(baseParams, {
        scale,
        animSpeed,
      }),
    []
  );

  useEffect(() => {
    // sets the params according to the props

    rootRef.current.style.width = `${params.width}px`;
    rootRef.current.style.height = `${params.height}px`;
    rootRef.current.style.left = `calc(50% - ${params.width / 2}px)`;
    setSet(true); // the animation will start at the second render-roadmap-roadmap-data not the first
    // the first render-roadmap-roadmap-data will only create the scafolding for the animation
  }, []);

  useEffect(() => {
    if (set) {
      // initialize the images and their positions + onclick
      arrangeImagesAndSetOnclick(baseArr, params, allowed);
      // sets the width and height of the main image
      initializeImgCenter('centerMain', params);
      // remove the hidden tag from the center div
      document.getElementById('center').classList.remove('hidden');
      // adds the animations for the center and small images
      anime({
        targets: '#center',
        rotateZ: 360,
        duration: params.duration,
        easing: 'linear',
        loop: true,
      });
      // counter rotate the other divs to keep them at the same rotation
      anime({
        targets: ['.smallTarget', '.mainTarget'],
        rotateZ: -360,
        duration: params.duration,
        easing: 'linear',
        loop: true,
      });

      let lastTime = -2500;
      const isPaused = false;
      let frameId: number;

      function animateSwitch(currentTime: number) {
        if (isPaused) {
          return;
        }

        if (currentTime - lastTime >= 3000) {
          lastTime = currentTime;

          const elArr = document.querySelectorAll('.smallTarget');
          const randomIdx = Math.floor(Math.random() * elArr.length);
          const randomElId = elArr[randomIdx].id;

          switchPlaces(allowed, randomElId);
        }

        frameId = requestAnimationFrame(animateSwitch);
      }

      document.addEventListener('visibilitychange', () => {
        arrangeImagesAndSetOnclick(baseArr, params, allowed);
        initializeImgCenter('centerMain', params);
      });

      frameId = requestAnimationFrame(animateSwitch);

      return () => {
        // cleanup
        cancelAnimationFrame(frameId);
      };
    }
  }, [set]);

  return (
    <div
      ref={rootRef}
      className='flex justify-center items-center overflow-hidden bg-background select-none'
    >
      <div id='center' className='w-1 h-1 border-green-400 relative hidden'>
        {set && (
          <>
            <button
              type='button'
              id='centerMain'
              className='absolute mainTarget rot'
            >
              <img
                draggable='false'
                alt='imageCenter'
                id='mainImg'
                className='w-full h-full rounded-[10%] bg-white'
                src={centerSrc}
              />
            </button>
            {baseArr.map((el, i) => {
              return (
                <button
                  type='button'
                  className='w-2 h-2 smallTarget'
                  key={el}
                  id={`${el}`}
                >
                  <img
                    draggable='false'
                    alt='imagerotating'
                    src={el}
                    className='w-full h-full rounded-[10%] bg-white'
                  />
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default HeroRotate;
