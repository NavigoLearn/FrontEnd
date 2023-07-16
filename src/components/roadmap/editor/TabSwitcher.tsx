import React, { useState } from 'react';
import AddAttachements from '@components/roadmap/editor/tabs/AddAttachements';
import Components from '@components/roadmap/editor/tabs/Components';
import Functionalities from '@components/roadmap/editor/tabs/Functionalities';
import Properties from '@components/roadmap/editor/tabs/Properties';
import Nodes from '@components/roadmap/editor/tabs/Nodes';
import roadmapPlaceholder from '@store/roadmap-refactor/data/roadmap-placeholder';
import { useStore } from '@nanostores/react';

// 1. First, to add a new button, add a new string to the array below
const tabs = [
  'Add Attachements',
  'Components',
  'Functionalities',
  'Properties',
  'Nodes',
];

function rightWrapper(Component) {
  const WrappedComponent = () => (
    <div className='absolute md:shadow-standard top-0  md:top-2 md:mt-0  md:right-2 w-full h-full md:w-[500px] md:h-[97%] bg-white'>
      <div className='h-full w-full'>
        <Component />
      </div>
    </div>
  );

  return WrappedComponent;
}

// 2. Then, add the new component below
const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState('Functionalities');
  const { nodes } = useStore(roadmapPlaceholder);

  function renderTab() {
    if (activeTab === 'Add Attachements') return <AddAttachements />;
    if (activeTab === 'Components') return <Components />;
    if (activeTab === 'Functionalities') return <Functionalities />;
    if (activeTab === 'Properties') return <Properties />;
    if (activeTab === 'Nodes') return <Nodes />;
    return <div>Nothing</div>;
  }

  // useEffect(() => {
  //   // ADD NEW TITLE EXAMPLE
  //   const title = 'New Title string';
  //   const id = 0; // any valid id here
  //   const node = nodes[id];
  // appendComponentTitle(node, factoryComponentTitle(title));
  //   MUTATE POSITION
  //   const componentId = 0; // any valid id here
  //   const component = getComponentTitleById(node, componentId);
  //   const newPosition = { x: 100, y: 100 };
  // mutateComponentTitleHeight(component, 100);
  //   mutateComponentTitleWidth(component, 100);
  // }, []);

  return (
    <div className='h-[100%] overflow-y-auto'>
      <div className='w-full grid grid-cols-4 mt-4'>
        {tabs.map((tab: string) => {
          return (
            <button
              key={tab}
              type='button'
              className='border border-gray-600 rounded-lg'
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className='mt-5 bg-red-500 h-5/6'>{renderTab()}</div>
    </div>
  );
};

export default rightWrapper(TabSwitcher);
