import React, { useState } from 'react';
import { dataSave } from '@store/explore/explorefilter';

const AugmentFilter = (OriginalComponent) => {
  const newFilter = (props) => {
    const [listItem, setListItem] = useState({
      SomeField1: 'none',
      SomeField2: 'none',
      SomeField3: 'none',
    });
    const [isOpen, setIsOpen] = useState('');
    return (
      <OriginalComponent
        onChange={(fieldDropDown, option) =>
          setListItem((prev) => ({ ...prev, [fieldDropDown]: option }))
        }
        onSave={() => {
          dataSave(listItem);
        }}
        // onCancel={}
        value={listItem}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        {...props}
      />
    );
  };

  return newFilter;
};

export default AugmentFilter;
