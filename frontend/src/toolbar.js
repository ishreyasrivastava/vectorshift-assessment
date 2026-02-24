// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-section">
                <h3>Pipeline</h3>
                <div className="toolbar-nodes">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='llm' label='LLM' />
                </div>
            </div>

            <div className="toolbar-section">
                <h3>Processing</h3>
                <div className="toolbar-nodes">
                    <DraggableNode type='merge' label='Merge' />
                    <DraggableNode type='conditional' label='Conditional' />
                    <DraggableNode type='transform' label='Transform' />
                    <DraggableNode type='api' label='API' />
                    <DraggableNode type='note' label='Note' />
                </div>
            </div>
        </div>
    );
};