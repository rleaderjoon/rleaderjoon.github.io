import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownConverter.css';

export default function MarkdownConverter() {
    const [markdownData, setMarkdownData] = useState([]);

    useEffect(() => {
        // 파일 목록을 불러옵니다
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
                    <h1>{filename}</h1>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
}