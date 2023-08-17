import React, { useState } from 'react';
import { dataSave } from '@store/explore/explorefilter';

const AugmentFilterD = (OriginalComponent) => {
  const newFilter = () => {
    const [listItem, setListItem] = useState({
      SomeField1: 'none',
      SomeField2: 'none',
      SomeField3: 'none',
    });
    const [filterChoosen, setFilterChoose] = useState(false);
    return (
      <OriginalComponent
        onChange={(fileDropDown, option) =>
          setListItem((prev) => ({ ...prev, [fileDropDown]: option }))
        }
        onSave={() => dataSave(listItem)}
        value={listItem} // pass listItem as 'value' prop
        filterChoose={filterChoosen}
        setFilterChoose={setFilterChoose}
      />
    );
  };
  return newFilter;
};

export default AugmentFilterD;
