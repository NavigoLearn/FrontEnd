import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import roadmapState from '@store/roadmap/data/roadmap_state';
import buttonsEditOwner from '@components/roadmap/sidebar/buttons-edit';
import buttonsCreate from '@components/roadmap/sidebar/buttons-create';
import loggedUser from '@store/user/user-status';
import roadmapVisitData, {
  validData,
} from '@store/roadmap/data/roadmap-visit-data';
import GenericButtonDesktop from '@components/roadmap/sidebar/GenericButtonDesktop';
import { buttonsViewVisitor, buttonsViewOwner } from './buttons-view';
import { divWrapper } from '../tabs/utils/logic';
import about from '@assets/about.svg';

const SideBar = ({ isCreate }: { isCreate: string }) => {
  const [hover, setHover] = useState(false);
  const { editing } = useStore(roadmapState);
  const [hydrated, setHydrated] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const loggedStatus =  useStore(loggedUser).isLogged;
  const { visitorIsOwner } = useStore(roadmapVisitData);

  useEffect(() => {
    if (validData()) {
      if (visitorIsOwner) {
        setIsOwner(true);
      }
    }
    setHydrated(true);
  }, [visitorIsOwner]);

  const handleHover = (e) => {
    // set hover based on weather event is mouseenter or mouseleave
    setHover(e.type === 'mouseenter');
  };

  const getButtonRoute = () => {
    if (hydrated && !editing && !isCreate && isOwner) {
      return buttonsViewOwner;
    }
    if (hydrated && editing && !isCreate && isOwner) {
      return buttonsEditOwner;
    }
    if (hydrated && isCreate) {
      return buttonsCreate;
    }
    if (hydrated && !isOwner) {
      return buttonsViewVisitor;
    }
    return [];
  };

  return (
    <div
      className='h-full  top-0 absolute left-0'
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div
        className={` bg-white
        h-full top-0 transition-all ease-linear duration-100 items-center justify-center gap-5 drop-shadow-xl flex-col-4 absolute left-0
       ${hover ? 'w-48' : 'w-20 m-auto'} 
        `}
      >
        {loggedStatus ? (
        <ul className='flex-col-4 min-h-full w-full gap-10 justify-self-center items-center '>
          {getButtonRoute().map((button) => {
            return (
              <GenericButtonDesktop
                key={button.id}
                id={button.id}
                onClick={button.clickHandler}
                hover={hover}
                title={button.title}
                cIcon={button.cIcon}
              />
            );
          })}
        </ul> ) : (   
          <div className='flex justify-center flex-col items-center mt-4'>
            <img draggable="false" src={about} alt='icons sidebar' className='w-9 h-9 select-none' />
            {hover ? (
              <div className='text-center font-kanit-text text-secondary text-xl'>You have to be logged in order to create roadmaps</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
