import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');

  return (
    <div className="base-node" style={{ minWidth: 220 }}>
      <div className="node-header" style={{ backgroundColor: '#ef4444' }}>
        <span className="node-title">Conditional</span>
      </div>
      
      <div className="node-content">
        <div className="node-field">
          <label className="node-field-label">Condition:</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Enter condition..."
            className="node-field-input"
          />
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        className="node-handle target"
      />

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-true`}
        style={{ 
          top: '35%',
          background: '#10b981'
        }}
        className="node-handle source"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-false`}
        style={{ 
          top: '65%',
          background: '#ef4444'
        }}
        className="node-handle source"
      />

      {/* T/F labels */}
      <div style={{
        position: 'absolute',
        right: '-25px',
        top: '32%',
        fontSize: '10px',
        fontWeight: '600',
        color: '#10b981'
      }}>
        T
      </div>
      <div style={{
        position: 'absolute',
        right: '-25px',
        top: '62%',
        fontSize: '10px',
        fontWeight: '600',
        color: '#ef4444'
      }}>
        F
      </div>
    </div>
  );
};