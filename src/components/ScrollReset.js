'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReset() {
    const pathname = usePathname();

    useEffect(() => {
        // 페이지 이동 시 스크롤을 즉시 맨 위로 이동
        // 'instant' behavior를 사용하여 부드러운 스크롤 애니메이션 없이 즉시 이동
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // 혹시 모를 렌더링/레이아웃 타이밍 이슈를 대비해 약간의 지연 후 재확인
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
