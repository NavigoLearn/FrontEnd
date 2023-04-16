import React, { useState } from 'react';
import ResourceEditProps from '@components/roadmap/nodes/node-resource/ResourceEditProps';
import ResourceNonEditProps from '@components/roadmap/nodes/node-resource/ResourceNonEditProps';
import { NodeResourceProps } from '@type/roadmap/nodes';
import {
  getTriggerDisable,
  getTriggerEnable,
} from '@store/runtime/rerenderTriggers';
import { setToolTip } from '@store/runtime/miscParams';
import { manualTrigger } from '@typescript/roadmap/roadmap-edit-decorators';
import {
  removeNodeInfoFromPlaceholder,
  removeNodeResourceFromPlaceholder,
  transferNodeResourceFromEditToPlaceholder,
  transferNodeResourceFromPlaceholderToEdit,
} from '@store/runtime/roadmap-placeholder';

const ResourceEdit = ({ id, title, nodes }: NodeResourceProps) => {
  const [editing, setEditing] = useState(false);

  return (
    <div
      className={` w-[256px]  pb-6 relative bg-white shadow-standard rounded-md `}
    >
      {editing ? (
        <ResourceEditProps
          id={id}
          onSave={() => {
            // transfers the data from the placeholder to the node
            transferNodeResourceFromPlaceholderToEdit(id);
            removeNodeResourceFromPlaceholder(id);
            getTriggerEnable(id)();
            setToolTip(id, () => null);
            setEditing(false);
          }}
          onCancel={() => {
            // does not run callbacks
            removeNodeInfoFromPlaceholder(id);
            getTriggerEnable(id)();
            setToolTip(id, () => null);
            setEditing(false);
          }}
        />
      ) : (
        <ResourceNonEditProps
          id={id}
          setCb={() => {
            transferNodeResourceFromEditToPlaceholder(id);
            // blocking the drag and drop of the node
            getTriggerDisable(id)();
            manualTrigger(id);
            setEditing(true);
          }}
        />
      )}
    </div>
  );
};

export default ResourceEdit;
