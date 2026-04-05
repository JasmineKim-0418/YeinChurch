'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './MainSlider.module.css';

const banners = [

    {
        id: 1,
        image: '/New Life Evangelism Festival_desk_1.jpeg',
        mobileImage: '/New Life Evangelism Festival_mobile_1.jpeg',
        alt: '새생명 전도축제 1',
    },
    {
        id: 2,
        image: '/main-banner-high-3.png',
        mobileImage: '/main-banner-mobile-3.png',
        alt: '예인교회에 오신 여러분을 진심으로 환영합니다',
    },
    {
        id: 3,
        image: '/New Life Evangelism Festival_desk_2.jpeg',
        mobileImage: '/New Life Evangelism Festival_mobile_2.jpeg',
        alt: '새생명 전도축제 2',
    },
    {
        id: 4,
        image: '/main-banner-high-0.png',
        mobileImage: '/main-banner-mobile-5.png',
        alt: '2026년 표어: 말씀을 읽고, 묵상하고, 살아내자',
    },


    // {
    //     id: 4,
    //     image: '/main-banner-high-4.png',
    //     mobileImage: '/main-banner-mobile-4.png',
    //     alt: '2026 엘러브 청년부 동계 수련회 BUILD UP!',
    // },
];

export default function MainSlider() {
    // 무한 루프 효과를 위해 첫 번째 배너를 마지막에 복재 추가
    const extendedBanners = [...banners, { ...banners[0], id: 'clone' }];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const timerRef = useRef(null);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
            setIsTransitioning(true);
        }, 10000); // 10초
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // 마지막 복제 슬라이드에 도달했을 때 처리
    useEffect(() => {
        if (currentIndex === extendedBanners.length - 1) {
            // 애니메이션이 끝난 후(800ms) 조용히 첫 번째로 이동
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 800); // CSS transition 시간과 일치시킴
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, extendedBanners.length]);

    const handleDotClick = (index) => {
        setIsTransitioning(true);
        setCurrentIndex(index);
        startTimer(); // 타이머 리셋
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        if (currentIndex === 0) {
            // 첫 번째에서 이전으로 갈 때: 마지막(복제)으로 순간이동 후 뒤로 이동하는 대신,
            // 간단하게 마지막 이미지로 이동
            setCurrentIndex(banners.length - 1);
        } else {
            setCurrentIndex((prev) => prev - 1);
        }
        startTimer();
    };

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
        startTimer();
    };

    return (
        <section className={styles.sliderContainer}>
            <div
                className={styles.sliderWrapper}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                }}
            >
                {extendedBanners.map((banner) => (
                    <div key={banner.id} className={styles.slide}>
                        {/* 메인 이미지 (반응형) */}
                        <picture className={styles.picture}>
                            <source media="(max-width: 900px)" srcSet={`${banner.mobileImage}?v=1`} />
                            <img
                                src={`${banner.image}?v=1`}
                                alt={banner.alt}
                                className={styles.bannerImage}
                            />
                        </picture>
                    </div>
                ))}
            </div>

            {/* 슬라이드 조절 도트 (원본 배너 개수만큼만 표시) */}
            <div className={styles.dots}>
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === (currentIndex % banners.length) ? styles.activeDot : ''}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* 내비게이션 버튼 */}
            <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrev}
                aria-label="Previous slide"
            >
                ‹
            </button>
            <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNext}
                aria-label="Next slide"
            >
                ›
            </button>
        </section>
    );
}
