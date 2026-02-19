// llmNode.js
// Refactored to use BaseNode for consistency and reduced code duplication

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const fields = [
    {
      name: 'description',
      type: 'static',
      text: 'This is an LLM.'
    }
  ];

  const handles = [
    {
      id: `${id}-system`,
      type: 'target',
      position: Position.Left,
      style: { top: `${100/3}%` }
    },
    {
      id: `${id}-prompt`,
      type: 'target',
      position: Position.Left,
      style: { top: `${200/3}%` }
    },
    {
      id: `${id}-response`,
      type: 'source',
      position: Position.Right,
      style: { top: '50%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      fields={fields}
      handles={handles}
      nodeColor="#a855f7"
    />
  );
};
