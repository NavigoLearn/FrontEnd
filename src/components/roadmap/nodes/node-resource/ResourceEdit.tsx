import React, { useState } from 'react';
import ResourceEditProps from '@components/roadmap/nodes/node-resource/ResourceEditProps';
import ResourceNonEditProps from '@components/roadmap/nodes/node-resource/ResourceNonEditProps';
import { NodeResourceProps } from '@type/roadmap/old/nodes';
import {
  getTriggerDisable,
  getTriggerEnable,
} from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { setToolTip } from '@store/roadmap-refactor/misc/miscParams';
import { manualTrigger } from '@src/typescript/roadmap/roadmap-edit-decorators';
import {
  removeNodeInfoFromPlaceholder,
  removeNodeResourceFromPlaceholder,
  transferNodeResourceFromEditToPlaceholder,
  transferNodeResourceFromPlaceholderToEdit,
} from '@store/roadmap/data/roadmap-placeholder';

const ResourceEdit = ({ id, title, nodes }: NodeResourceProps) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className={` w-[224px]  pb-6 bg-white shadow-standard rounded-md `}>
      {editing ? (
        <ResourceEditProps
          id={id}
          onSave={() => {
            // transfers the roadmap-roadmap-data from the placeholder to the node
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
