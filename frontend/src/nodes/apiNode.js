import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const APINode = ({ id, data }) => {
  const fields = [
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      placeholder: 'https://api.example.com/endpoint',
      defaultValue: '',
    },
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
      ],
      defaultValue: 'GET',
    },
    {
      name: 'headers',
      label: 'Headers',
      type: 'textarea',
      placeholder: 'Content-Type: application/json\nAuthorization: Bearer token',
      rows: 3,
      defaultValue: 'Content-Type: application/json',
    },
  ];

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      fields={fields}
      handles={handles}
      nodeColor="#06b6d4"
      minWidth={250}
    />
  );
};