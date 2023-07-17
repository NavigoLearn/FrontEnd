import React, { useEffect, useRef, createElement } from 'react';

const NodeView = ({ node }) => {
  const ref = useRef(null);
  const { properties } = node;

  function adjustToCenter() {
    // ...
    return {
      x: 0,
      y: 0,
    };
  }

  //   const componentFactory = () => {
  //     // create component
  //     const divElement = document.createElement('div');
  //     divElement.setAttribute('id', 'component');
  //     divElement.setAttribute('class', 'component');
  //     divElement.innerHTML = 'Hello World';
  //     divElement.style.position = 'absolute';
  //     divElement.style.width = '100px';
  //     divElement.style.height = '100px';
  //   };

  //   const placeComponent = () => {
  //     // use the value from adjustToCenter
  //   };

  //   const renderComponents = () => {
  //     // render components
  //     const component = componentFactory();
  //     placeComponent();
  //     ref.current.appendChild(component);
  //   };

  const renderCurrentNode = () => {
    // rendering the current node properties
    const { id, color, width, height, opacity } = properties;
    const currentNode = createElement('div', {
      id,
      style: {
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
        // opacity,
      },
    });
  };

  //   useEffect(() => {
  //     const rootDiv = ref.current;
  //     if (!rootDiv) {
  //     }
  //   }, []);

  // title and description has an x and y coordinate
  // make the component relative to the big node center

  return (
    <div ref={ref}>
      {renderCurrentNode()}
      {/* {renderComponents()} */}
    </div>
  );
};

export default NodeView;
