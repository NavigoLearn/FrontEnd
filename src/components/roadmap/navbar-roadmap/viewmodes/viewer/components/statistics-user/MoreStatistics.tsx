import React from 'react';
import { ChevronDown } from 'lucide-react';

const MoreStatistics = () => {
  return (
    <div className='flex items-center'>
      <span>More statistics</span>
      <ChevronDown size={22} />
    </div>
  );
};

export default MoreStatistics;
