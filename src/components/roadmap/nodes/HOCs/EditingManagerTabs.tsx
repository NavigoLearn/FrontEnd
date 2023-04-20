import React, { useState, useRef } from 'react';
import {
  EditingComponentBasicProps,
  NonEditingComponentBasicProps,
} from '@type/roadmap/components';
import { capStringLen } from '@typescript/roadmap/utils2';

// this is the component that manages the state of a specific part of a node
function StateAugmentedComponent() {
  const StateManger = ({
    data,
    EditingComponent,
    NonEditingComponent,
    persistDataSave,
    capLen,
  }: {
    data: string;
    EditingComponent: React.FC<EditingComponentBasicProps>;
    NonEditingComponent: React.FC<NonEditingComponentBasicProps>;
    persistDataSave(newVal: string): void;
    capLen: number;
  }) => {
    // does the editing state management
    const [editing, setEditing] = useState(false);
    const [state, setState] = useState(data || '');

    return editing ? (
      <EditingComponent
        data={state}
        onChange={(value: string) => {
          const newVal = capStringLen(value, capLen);
          setState(newVal);
        }}
        onSave={() => {
          setEditing(false);
          persistDataSave(state); // saves the changes to the global store
        }}
        onCancel={() => {
          setEditing(false);
          setState(data);
        }}
      />
    ) : (
      <NonEditingComponent
        data={data}
        setCb={() => {
          setEditing(true);
        }}
      />
    );
  };
  return StateManger;
}

export default StateAugmentedComponent;
