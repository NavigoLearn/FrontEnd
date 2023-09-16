import React from 'react';

type IStatisticProps = {
  title: string;
  value: string;
  type?: 'desktop' | 'mobile';
};
const Statistic = ({ title, value, type }: IStatisticProps) => {
  const mobileStyle = type === 'mobile' ? 'text-md' : '';
  return (
    <div className='flex justify-start'>
      <div className=''>
        <h6
          className={`text-placeholder lg:text-sm monitor:text-lg  ${mobileStyle} w-full text-center`}
        >
          {title}
        </h6>
        <h2 className='w-full text-center text-darkBlue font-medium  text-2xl monitor:text-3xl'>
          {value}
        </h2>
      </div>
    </div>
  );
};

Statistic.defaultProps = {
  style: 'desktop',
};
export default Statistic;
