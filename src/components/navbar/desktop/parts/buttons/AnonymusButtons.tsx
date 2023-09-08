import React from 'react';
import Button from '@components/navbar/desktop/parts/buttons/Button';
import { setBasePopup } from '@components/shared/stores/store-base-popups';

const AnonymusButtons = () => {
  return (
    <div className='flex gap-8 mr-6 items-center'>
      <Button
        hasUnder
        name='Get Started'
        buttonData={{
          type: 'button',
          callback: () => {
            console.log('get-started');
            setBasePopup('get-started');
          },
        }}
      />

      <Button
        hasUnder
        name='Try tool'
        buttonData={{
          type: 'link',
          href: '/roadmap/create',
        }}
      />
    </div>
  );
};

export default AnonymusButtons;
