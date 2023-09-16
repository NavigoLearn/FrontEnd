import React, { useState } from 'react';

type IButtonActions = {
  selectedButton: string;
};

const ButtonActions = ({ selectedButton }: IButtonActions) => {
  const buttonOptions = ['Sizing', 'Colors', 'Interior'];

  const [activeButton, setActiveButton] = useState(null);
  return (
    <div className='flex flex-row gap-20 justify-start items-start'>
      {buttonOptions.map((buttonOption: string) => {
        return (
          <div>
            <button
              type='button'
              onClick={() => setActiveButton(buttonOption)}
              className={`flex flex-col justify-center items-center gap-4 ${
                activeButton === buttonOption
                  ? 'text-darkBlue'
                  : 'text-placeholderBlack'
              }`}
            >
              
          </div>
        );
      })}
    </div>
  );
};

export default ButtonActions;
