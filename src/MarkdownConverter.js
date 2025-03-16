// MarkdownConverter.jsx
import React, { useState, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

export default function MarkdownConverter() {
    const [markdownData, setMarkdownData] = useState([]);

    useEffect(() => {
        fetch('/markdown/index.json')
            .then(response => response.json())
            .then(files => {
                const fetchPromises = files.map(file =>
                    fetch(`/markdown/${file}`)
                        .then(response => response.text())
                        .then(content => ({ filename: file.replace('.md', ''), content }))
                );
                return Promise.all(fetchPromises);
            })
            .then(data => {
                setMarkdownData(data);
            });
    }, []);

    return (
        <div className="markdown-container">
            {markdownData.map(({ filename, content }, index) => (
                <div key={index} className="markdown-box">
                    <MarkdownRenderer filename={filename} content={content} />
                </div>
            ))}
        </div>
    );
}