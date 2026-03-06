'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimationObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // 애니메이션이 끝나면 관찰 중지 (한 번만 실행)
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1, // 10% 보이면 시작
            }
        );

        // 약간의 지연 시간을 주어 DOM이 렌더링된 후 요소를 찾도록 함
        const timer = setTimeout(() => {
            const targets = document.querySelectorAll('.fade-in-section');
            targets.forEach((target) => observer.observe(target));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [pathname]); // 경로가 변경될 때마다 실행

    return null;
}
