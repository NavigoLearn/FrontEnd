import React, { useEffect } from 'react';
import { getNodeByIdEdit } from '@typescript/roadmap/roadmap-edit-logic';
import { EditingComponentNodesProps } from '@type/roadmap/old/components';
import {
  setToolTip,
  setZoomAllowed,
} from '@store/roadmap-refactor/misc/miscParams';
import TitleEdit from '@components/roadmap/nodes/node-resource/editable-fields/ResourceTitleEdit';
import SaveCancelButtons from '@components/roadmap/nodes/misc/SaveButtons';
import { changeNodeInfo } from '@store/roadmap/data/roadmap-placeholder';

const InfoEditProps = ({
  id,
  onSave,
  onCancel,
}: EditingComponentNodesProps) => {
  const renderButtons = () => {
    return (
      <SaveCancelButtons
        onSave={() => {
          setZoomAllowed(true);
          onSave();
        }}
        onCancel={onCancel}
      />
    );
  };
  const node = getNodeByIdEdit(id);

  useEffect(() => {
    setToolTip(id, () => {
      return renderButtons();
    });
  }, []);
  // title component when elements-editing
  return (
    <div
      className='h-full  w-56 py-2 px-2 '
      onMouseEnter={() => {
        setZoomAllowed(false);
      }}
      onMouseLeave={() => {
        setZoomAllowed(true);
      }}
      onTouchStart={() => {
        setZoomAllowed(false);
      }}
      onTouchEnd={() => {
        setZoomAllowed(true);
      }}
    >
      <TitleEdit
        originalValue={node.title}
        onChange={(newTitle) => {
          if (typeof newTitle === 'string')
            changeNodeInfo(id, 'title', newTitle);
        }}
      />
    </div>
  );
};

export default InfoEditProps;
