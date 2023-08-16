import React, { useEffect, useState } from 'react';
import DraggableInput from '@src/UI-library/DraggableInput';

const Feedback = () => {
  const [isDesktop, setIsDesktop] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {typeof isDesktop === 'undefined' ? null : (
        <div>{/* <DesktopFeedback /> */}</div>
      )}
    </div>
  );
};

export default Feedback;
