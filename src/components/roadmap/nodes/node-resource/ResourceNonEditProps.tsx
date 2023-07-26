import React, { useEffect } from 'react';
import { renderNodeNormal } from '@components/roadmap/nodes/node-resource/utils';
import { addNodeNew } from '@src/typescript/roadmap/roadmap-edit-logic-decorated';
import { NonEditingComponentProps } from '@type/roadmap/old/components';
import { getNodeByIdEdit } from '@src/typescript/roadmap/roadmap-edit-logic';
import { isNodeResourceStore } from '@type/roadmap/old/typecheckers';
import { setToolTip } from '@store/roadmap-refactor/misc/miscParams';
import ButtonsView from '@components/roadmap/nodes/misc/ButtonsView';
import plus from '@assets/plus.svg';
import edit from '@assets/edit.svg';

const ResourceNonEditProps = ({
  id: idProp,
  setCb,
}: NonEditingComponentProps) => {
  const node = getNodeByIdEdit(idProp);
  if (!isNodeResourceStore(node)) {
    throw new Error('node is not a resource');
  }
  const renderButtons = () => {
    return <ButtonsView id={idProp} type={node.type} level={node.level} />;
  };
  useEffect(() => {
    setToolTip(idProp, () => {
      return renderButtons();
    });
  }, []);

  return (
    <div>
      <div className=' py-4 flex items-center justify-between  '>
        <button
          type='button'
          className='w-10 h-10 flex justify-center items-center'
          onClick={() => {
            addNodeNew(idProp, 'Info');
          }}
        >
          <img draggable='false' src={plus} width='16px' alt='add' />
        </button>
        <div className='text-lg  text-placeholder'>{node.title}</div>
        <button
          type='button'
          className='w-10 h-10 flex justify-center items-center'
          onClick={() => {
            setCb();
          }}
        >
          <img draggable='false' src={edit} width='20px' alt='edit' />
        </button>
      </div>
      {node.nodes.map((id) => {
        return renderNodeNormal(id, idProp);
      })}
    </div>
  );
};

export default ResourceNonEditProps;
