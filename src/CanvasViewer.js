import React, { useEffect, useState } from 'react';

function CanvasViewer({ fileName }) {
    const [canvasData, setCanvasData] = useState(null);

    useEffect(() => {
        fetch(`/markdown/${fileName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCanvasData(data))
            .catch(error => console.error('Error fetching the canvas file:', error));
    }, [fileName]);

    if (!canvasData) return <div>Loading...</div>;

    return (
        <div className="canvas-container" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'auto' }}>
            {canvasData.nodes.map(node => (
                <div key={node.id} style={{
                    position: 'absolute',
                    left: node.x,
                    top: node.y,
                    width: node.width,
                    height: node.height,
                    border: '1px solid black',
                    padding: '10px',
                    boxSizing: 'border-box',
                    backgroundColor: 'gray',
                }}>
                    {node.type === 'text' && <div>{node.text}</div>}
                </div>
            ))}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                {canvasData.edges.map(edge => {
                    const fromNode = canvasData.nodes.find(node => node.id === edge.fromNode);
                    const toNode = canvasData.nodes.find(node => node.id === edge.toNode);

                    if (!fromNode || !toNode) return null;

                    return (
                        <line
                            key={edge.id}
                            x1={fromNode.x + fromNode.width / 2}
                            y1={fromNode.y + fromNode.height}
                            x2={toNode.x + toNode.width / 2}
                            y2={toNode.y}
                            stroke="black"
                        />
                    );
                })}
            </svg>
        </div>
    );
}

export default CanvasViewer;