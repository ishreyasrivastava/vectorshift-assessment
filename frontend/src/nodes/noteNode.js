import { useState } from 'react';

export const NoteNode = ({ id, data }) => {
  const [noteText, setNoteText] = useState(data?.note || 'Add a note...');

  return (
    <div className="base-node" style={{ minWidth: 250, backgroundColor: '#fffbeb' }}>
      <div className="node-header" style={{ backgroundColor: '#f59e0b' }}>
        <span className="node-title">Note</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <textarea 
            value={noteText} 
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Document your pipeline..." 
            className="node-field-textarea" 
            rows={4}
            style={{ 
              border: 'none', 
              background: 'transparent', 
              resize: 'vertical' 
            }} 
          />
        </div>
      </div>
    </div>
  );
};