import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // 코드블럭 스타일링

export default function MarkdownRenderer({ filename, content }) {
    return (
        <div>
            <h1>{filename}</h1>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}