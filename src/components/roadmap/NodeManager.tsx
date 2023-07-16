import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { NodeInfoProps, NodeManagerProps } from '@type/roadmap/old/nodes';
import {
  isNodeInfoProps,
  isNodeResourceProps,
} from '@type/roadmap/old/typecheckers';
import { getNodeById } from '@store/roadmap/data/roadmap_static';
import { addDraggabilityFlow } from '@typescript/roadmap_ref/render/dragging';
import levels from '@styles/levelStyles';
import { getNodeByIdEdit } from '@typescript/roadmap/roadmap-edit-logic';
import Tooltip from '@components/roadmap/nodes/misc/Tooltip';
import Node from './nodes/node-info/Node';
import Resource from './nodes/node-resource/Resource';

const NodeManager = ({ data, editing, triggerCb }: NodeManagerProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const objRef = useRef<SVGForeignObjectElement>(null);
  const [render, setRender] = useState(true);
  const dataRef = useRef(data);

  function triggerRender() {
    setRender((val) => !val);
    // used for selective rerendering of the nodes
  }

  function disableDraggability() {
    addDraggabilityFlow(data.id, false);
  }
  function enableDraggability() {
    addDraggabilityFlow(data.id, true);
  }

  useLayoutEffect(() => {
    triggerCb(triggerRender, disableDraggability, enableDraggability);
  }, []);

  useEffect(() => {
    // things to trigger on rerender
    if (rootRef) {
      // updates the size of the foreignObject to match the size of the div for draggability and movement purposes
      const width = `${rootRef.current.offsetWidth}`;
      const height = `${rootRef.current.offsetHeight}`;
      objRef.current.setAttribute('width', width);
      objRef.current.setAttribute('height', height);
    }
  }, [render]);

  useEffect(() => {
    // locks the nodes that are currently in text elements-editing or view mode
    addDraggabilityFlow(data.id, editing);
  }, [editing]);

  const renderNode = () => {
    // we fetch the roadmap-roadmap-data from the nanostores here in order to get rerendering on roadmap-roadmap-data change
    const { id } = data as NodeInfoProps;
    let node;
    if (editing) {
      node = editing ? getNodeByIdEdit(id) : getNodeById(id);
    } else {
      node = data;
    }
    dataRef.current = node;
    if (isNodeInfoProps(node)) {
      const { title, tabId, level } = node;
      return (
        <Node
          level={level}
          editing={editing}
          id={id}
          title={title}
          tabId={tabId}
        />
      );
    }
    if (isNodeResourceProps(node)) {
      const { id: idNode, title, nodes: resNodes, level } = node;
      return (
        <Resource level={level} id={idNode} title={title} nodes={resNodes} />
      );
    }
    throw new Error('something went wrong');
  };
  const renderedNode = useMemo(() => {
    return renderNode();
  }, [render]);

  const compOpacity = levels[dataRef.current.level].comp;

  return (
    <>
      <g
        id={`tooltip${data.id}`}
        transform={`translate(${data.x - 24},${data.y - 128})`}
      >
        <foreignObject className='pointer-events-none' width='260' height='128'>
          <Tooltip id={data.id} />
        </foreignObject>
      </g>
      <g id={`group${data.id}`} transform={`translate(${data.x},${data.y})`}>
        <foreignObject
          ref={objRef}
          className='bg-transparent overflow-visible pointer-events-auto '
        >
          <div
            ref={rootRef}
            className={`  inline-block  bg-transparent ${compOpacity}  `}
          >
            {renderedNode}
          </div>
        </foreignObject>
      </g>
    </>
  );
};

export default NodeManager;
