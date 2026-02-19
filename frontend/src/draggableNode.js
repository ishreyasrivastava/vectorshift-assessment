// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    // Color mapping for node types
    const getNodeColor = (nodeType) => {
        const colors = {
            customInput: '#3b82f6',
            customOutput: '#ef4444',
            text: '#f97316',
            llm: '#8b5cf6',
            merge: '#8b5cf6',
            conditional: '#ef4444',
            transform: '#84cc16',
            api: '#06b6d4',
            note: '#f59e0b'
        };
        return colors[nodeType] || '#6b7280';
    };
  
    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <div 
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: getNodeColor(type),
            flexShrink: 0
          }}
        />
        <span>{label}</span>
      </div>
    );
  };