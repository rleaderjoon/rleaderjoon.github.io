import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // 기본 코드블럭 스타일
import './MarkdownRenderer.css'; // 새로 정의한 CSS 파일 불러오기

export default function MarkdownRenderer({ filename, content }) {
    return (
        <div>
            <h1>{filename}</h1>
            <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <pre className="code-block"> {/* 코드 블럭에 적용 */}
                                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}