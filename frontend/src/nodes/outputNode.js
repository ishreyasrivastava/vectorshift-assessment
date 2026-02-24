// outputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const fields = [
    {
      name: 'outputName',
      type: 'text',
      label: 'Name',
      defaultValue: id.replace('customOutput-', 'output_')
    },
    {
      name: 'outputType',
      type: 'select',
      label: 'Type',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' }
      ]
    }
  ];

  const handles = [
    {
      id: `${id}-value`,
      type: 'target',
      position: Position.Left,
      style: { top: '50%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={fields}
      handles={handles}
      nodeColor="#10b981"
    />
  );
};
