// textNode.js

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // this regex took me a while to get right
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

  // Extract variables from text with auto-resizing
  const variables = useMemo(() => {
    const matches = [];
    let match;
    
    while ((match = variableRegex.exec(currText)) !== null) {
      matches.push(match[1]);
    }
    
    // deduplicate — same variable can appear multiple times
    return [...new Set(matches)];
  }, [currText]);

  // Auto-resize textarea based on content
  const handleTextChange = useCallback((e) => {
    setCurrText(e.target.value);
    
    // Auto-resize using scrollHeight
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, []);

  // Initial resize on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  // Calculate dynamic width based on content (200-400px)
  const nodeWidth = Math.min(400, Math.max(200, currText.length * 6 + 100));

  return (
    <div 
      className="base-node" 
      style={{ 
        minWidth: nodeWidth,
        maxWidth: 400
      }}
    >
      <div className="node-header" style={{ backgroundColor: '#f97316' }}>
        <span className="node-title">Text</span>
      </div>
      
      <div className="node-content">
        <div className="node-field">
          <label className="node-field-label">Text:</label>
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange}
            className="node-field-textarea"
            placeholder="Enter your text with {{variables}}"
            style={{ 
              resize: 'none',
              overflow: 'hidden',
              minHeight: '60px'
            }}
          />
        </div>
      </div>

      {/* Dynamic target handles for each detected variable */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ 
            top: `${40 + (index * 25)}px`,
            background: '#6366f1'
          }}
          className="node-handle target"
        />
      ))}

      {/* Source handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="node-handle source"
      />
    </div>
  );
};