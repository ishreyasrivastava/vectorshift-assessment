import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const MergeNode = ({ id, data }) => {
  const fields = [
    {
      name: 'strategy',
      label: 'Strategy',
      type: 'select',
      options: [
        { value: 'concatenate', label: 'Concatenate' },
        { value: 'first_non_empty', label: 'First Non-Empty' },
        { value: 'join_separator', label: 'Join with Separator' },
      ],
      defaultValue: 'concatenate',
    },
    {
      name: 'separator',
      label: 'Separator',
      type: 'text',
      placeholder: 'e.g., ", " or " | "',
      defaultValue: ', ',
    },
  ];

  const handles = [
    { id: `${id}-input1`, type: 'target', position: Position.Left, style: { top: '30%' } },
    { id: `${id}-input2`, type: 'target', position: Position.Left, style: { top: '70%' } },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      fields={fields}
      handles={handles}
      nodeColor="#8b5cf6"
      minWidth={220}
    />
  );
};