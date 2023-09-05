import React from 'react';

type IStatisticProps = {
  title: string;
  value: string;
};
const Statistic = ({ title, value }: IStatisticProps) => {
  return (
    <div className='flex justify-start'>
      <div className=''>
        <h6 className='text-placeholder text-sm monitor:text-lg w-full text-center'>
          {title}
        </h6>
        <h2 className='w-full text-center text-darkBlue font-medium text-2xl monitor:text-3xl'>
          {value}
        </h2>
      </div>
    </div>
  );
};

export default Statistic;
