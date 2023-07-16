import React, { useEffect, useRef, useState } from 'react';
import cross from '@assets/cross.svg';
import AboutNonEditField from '@components/roadmap/tabs/about/AboutNonEditField';
import AboutEditingField from '@components/roadmap/tabs/about/AboutEditingField';
import { useStore } from '@nanostores/react';
import aboutTabStore, {
  setTabAboutProp,
  setTabAboutPropNoRequest,
} from '@store/roadmap/data/about';
import { TabAbout } from '@type/roadmap/old/tab-manager';
import EditingManagerTabs from '@components/roadmap/tabs/EditingManagerTabs';
import useStateAndRef from '@hooks/useStateAndRef';
import AboutStaticField from '@components/roadmap/tabs/about/AboutStaticField';
import AboutEditingFieldTextarea from '@components/roadmap/tabs/about/AboutEditingFieldTextarea';
import roadmapVisitData, {
  validData,
} from '@store/roadmap/data/roadmap-visit-data';
import roadmapState, { getIsCreate } from '@store/roadmap/data/roadmap_state';
import { divWrapper } from '../utils/logic';

const About = () => {
  const fields = ['name', 'author', 'description'];
  const longFields = ['description'];
  const editableFields = ['name', 'description'];

  const capLens = {
    name: 20,
    description: 1000,
  };

  const aboutStore = useStore(aboutTabStore);
  const [about, setAbout, aboutRef] = useStateAndRef(aboutStore);
  const [render, setRender] = useState(false);

  const PropertyHOC = useRef(EditingManagerTabs());
  const Property = PropertyHOC.current;

  const { visitorIsOwner } = useStore(roadmapVisitData);
  const editableRef = useRef([]);

  useEffect(() => {
    setAbout(aboutStore);
  }, [aboutStore]);

  useEffect(() => {
    if ((visitorIsOwner && validData()) || getIsCreate() === true) {
      editableRef.current = [...editableFields];
    } else {
      editableRef.current = [];
    }
    setRender((prev) => !prev);
  }, [visitorIsOwner]);

  return (
    <div className='h-full w-full relative bg-white md:border-t-0'>
      <div className='w-5/6 flex justify-center items-center mx-8 mt-6 relative '>
        <button
          type='button'
          className=' w-6 h-6 absolute left-0 select-none'
          onClick={() => {
            // close tab-attachment
            // flipOpen();
          }}
        >
          <img
            draggable='false'
            alt='close tab issue'
            src={cross}
            className='w-6 h-6'
          />
        </button>

        <div className=' font-kanit-text font-semibold text-2xl md:text-4xl '>
          About
        </div>
      </div>

      <div className='mt-4'>
        {fields.map((field: keyof TabAbout) => {
          return (
            <div key={field}>
              {editableRef.current.includes(field) &&
                divWrapper(
                  <div className=' w-full'>
                    <div className=' font-light text-secondary text-base'>
                      {field}
                    </div>
                    <Property
                      EditingComponent={
                        longFields.includes(field)
                          ? AboutEditingFieldTextarea
                          : AboutEditingField
                      }
                      NonEditingComponent={AboutNonEditField}
                      data={aboutRef.current[field]}
                      persistDataSave={(value) => {
                        if (!roadmapState.get().isCreate) {
                          setTabAboutProp(
                            field,
                            value,
                            roadmapVisitData.get().roadmapId
                          );
                        } else {
                          setTabAboutPropNoRequest(
                            field,
                            value,
                            roadmapVisitData.get().roadmapId
                          );
                        }
                      }}
                      capLen={capLens[field]}
                    />
                  </div>
                )}
              {!editableRef.current.includes(field) && (
                <AboutStaticField field={field} data={about[field]} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
