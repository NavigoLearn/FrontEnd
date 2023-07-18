import React, { useEffect, useRef } from 'react';

const Component = () => {
  const ref = useRef(null);

  function adjustToCenter() {
    // ...
    return {
      x: 0,
      y: 0,
    };
  }

  const componentFactory = () => {
    // create component
    const divElement = document.createElement('div');
    divElement.setAttribute('id', 'component');
    divElement.setAttribute('class', 'component');
    divElement.innerHTML = 'Hello World';
    divElement.style.position = 'absolute';
    divElement.style.width = '100px';
    divElement.style.height = '100px';
  };

  const placeComponent = () => {
    //
  };

  const renderComponents = () => {
    // render components
    const component = componentFactory();
    placeComponent();
    ref.current.appendChild(component);
  };

  const renderCurrentNode = () => {
    // rendering the current node properties
  };

  useEffect(() => {
    const rootDiv = ref.current;
    if (!rootDiv) {
    }
  }, []);

  return <div ref={ref} />;
};

export default Component;
