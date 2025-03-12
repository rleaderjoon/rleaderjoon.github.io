import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownConverter() {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        // `public` 폴더는 기본 경로로 참조
        fetch('/markdown/Test.md')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((text) => setMarkdown(text))
            .catch((error) => console.error('Error fetching markdown:', error));
    }, []);

    return (
        <div>
            <h1>마크다운 뷰어</h1>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
}