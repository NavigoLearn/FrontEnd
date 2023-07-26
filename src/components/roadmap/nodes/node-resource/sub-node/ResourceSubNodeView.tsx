import React, { useRef } from 'react';
import { NodeInfoProps } from '@type/roadmap/old/nodes';
import { setInfoFlow } from '@src/typescript/roadmap/tab-logic-flows';

const ResourceSubNodeView = ({ title, tabId, id }: NodeInfoProps) => {
  const rootRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      type='button'
      ref={rootRef}
      className=' text-sm p-2  rounded-xl shadow-standard w-48 h-8 bg-resourceSubNode border-2 border-light font-medium'
      onClick={() => {
        // tab-attachment changing roadmap-roadmap-data
        setInfoFlow(tabId);
      }}
    >
      <div
        className={` h-full font-roboto-text  w-full flex justify-center items-center text-sm`}
      >
        {title}
      </div>
    </button>
  );
};

export default ResourceSubNodeView;
