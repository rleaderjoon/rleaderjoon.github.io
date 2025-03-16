import React from 'react';

/**
 * `Header` 컴포넌트
 *
 * 논문의 제목과 저자 정보를 표시하는 컴포넌트입니다.
 * 페이지 상단에 위치하며, 주요 정보 제공의 역할을 합니다.
 */
function Header() {
    return (
        <div className="header">
            <h1>논문 제목</h1>
            <p>저자 이름</p>
        </div>
    );
}

export default Header;