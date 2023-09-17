import React from 'react';
import { LINK_SVG_SRC } from '@src/to-be-organized/svg-params';

type IProps = {
  name: string;
  value: string;
  data:
    | {
        type: 'text';
      }
    | {
        type: 'link';
        href: string;
      };
};
const DisplayProfilePropertyM = ({ name, value, data }: IProps) => {
  return (
    <div>
      <div className='break-words w-full'>
        <div className='text-secondary font-roboto-text'>{name}</div>
        <div>
          {data.type === 'text' ? (
            <div>
              <div className='text-lg font-roboto-text text-darkBlue font-medium'>
                {value || `No ${name} yet`}
              </div>
            </div>
          ) : (
            <a
              href={data.href}
              className='text-lg relative font-roboto-text text-darkBlue font-medium'
              target='_blank'
              rel='noopener noreferrer'
            >
              {value || `No ${name} yet`}
              <div className='absolute -right-10 w-6 h-6 top-0'>
                <img
                  alt='go to link icon'
                  className='w-full h-full'
                  src={LINK_SVG_SRC}
                />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayProfilePropertyM;
