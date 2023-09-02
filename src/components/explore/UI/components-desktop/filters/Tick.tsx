import React from 'react';

type ITickProps = {
  width: number;
  height: number;
  fill: string;
};
const Tick = ({ width, height, fill }: ITickProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 14 14'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.1878 0.330078H1.81742C1.0026 0.330078 0.335938 0.996745 0.335938 1.81156V12.1819C0.335938 12.9967 1.0026 13.6634 1.81742 13.6634H12.1878C13.0026 13.6634 13.6693 12.9967 13.6693 12.1819V1.81156C13.6693 0.996745 13.0026 0.330078 12.1878 0.330078ZM5.51968 10.7009L1.81597 6.99718L2.85301 5.96014L5.51968 8.62681L11.1493 2.99718L12.1863 4.03422L5.51968 10.7009Z'
        fill={fill}
      />
    </svg>
  );
};

export default Tick;
