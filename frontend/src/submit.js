// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        const pipeline = {
            nodes: nodes.map((node) => ({
                id: node.id,
                type: node.type,
                data: node.data || {},
            })),
            edges: edges.map((edge) => ({
                source: edge.source,
                target: edge.target,
            })),
        };

        console.log('Submitting pipeline:', nodes.length, 'nodes,', edges.length, 'edges');

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pipeline),
            });

            const data = await response.json();

            alert(
                `Pipeline Analysis:\n\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? '✅ Yes' : '❌ No (contains cycle)'}`
            );
        } catch (error) {
            alert('Error connecting to backend. Make sure the server is running.');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={{
                    padding: '8px 24px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
};
