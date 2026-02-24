// inputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const fields = [
    {
      name: 'inputName',
      type: 'text',
      label: 'Name',
      defaultValue: id.replace('customInput-', 'input_')
    },
    {
      name: 'inputType',
      type: 'select',
      label: 'Type',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ];

  const handles = [
    {
      id: `${id}-value`,
      type: 'source',
      position: Position.Right,
      style: { top: '50%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={fields}
      handles={handles}
      nodeColor="#3b82f6"
    />
  );
};
