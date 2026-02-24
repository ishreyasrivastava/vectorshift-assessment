// transformNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const TRANSFORM_OPTIONS = [
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'regex', label: 'Regex Replace' },
    { value: 'split', label: 'Split' },
    { value: 'template', label: 'Template' },
];

export const TransformNode = ({ id, data }) => {
    const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

    // Conditional fields based on transform type — only show what's relevant
    const getFields = () => {
        const base = [
            {
                name: 'transformType',
                label: 'Transform',
                type: 'select',
                options: TRANSFORM_OPTIONS,
                defaultValue: 'uppercase',
            },
        ];

        switch (transformType) {
            case 'regex':
                return [
                    ...base,
                    { name: 'pattern', label: 'Pattern', type: 'text', placeholder: 'e.g. \\d+' },
                    { name: 'replacement', label: 'Replace with', type: 'text', placeholder: 'replacement' },
                ];
            case 'split':
                return [
                    ...base,
                    { name: 'delimiter', label: 'Delimiter', type: 'text', placeholder: 'e.g. ,' },
                ];
            case 'template':
                return [
                    ...base,
                    { name: 'template', label: 'Template', type: 'textarea', placeholder: 'Use {{input}} for value', rows: 2 },
                ];
            default:
                // uppercase, lowercase — no extra fields needed
                return base;
        }
    };

    return (
        <BaseNode
            id={id}
            data={{ ...data, onFieldChange: (name, val) => { if (name === 'transformType') setTransformType(val); } }}
            title="Transform"
            fields={getFields()}
            handles={[
                { id: `${id}-input`, type: 'target', position: Position.Left },
                { id: `${id}-output`, type: 'source', position: Position.Right },
            ]}
            nodeColor="#f59e0b"
            minWidth={220}
        />
    );
};
