// BaseNode.js
// All nodes extend this to avoid repeating the same UI code everywhere

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  fields = [], 
  handles = [],
  nodeColor = '#6366f1',
  minWidth = 200 
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="node-field-input"
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="node-field-select"
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="node-field-textarea"
            rows={field.rows || 3}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className="node-field-input"
          />
        );
      
      case 'static':
        return (
          <span className="node-field-static">
            {field.text}
          </span>
        );
      
      default:
        return null;
    }
  };

  // TODO: could add validation per field type

  return (
    <div className="base-node" style={{ minWidth }}>
      <div className="node-header" style={{ backgroundColor: nodeColor }}>
        <span className="node-title">{title}</span>
      </div>
      
      <div className="node-content">
        {fields.map(field => (
          <div key={field.name} className="node-field">
            {field.label && (
              <label className="node-field-label">{field.label}:</label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>
      
      {handles.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          className={`node-handle ${handle.type}`}
        />
      ))}
    </div>
  );
};