'use client';

import { useState, useEffect } from 'react';
import styles from './gallery.module.css';

export default function GalleryClient({ items }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 팝업 열기
    const openLightbox = (item) => {
        setSelectedItem(item);
        setCurrentImageIndex(0); // 첫 번째 이미지부터 시작
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    };

    // 팝업 닫기
    const closeLightbox = () => {
        setSelectedItem(null);
        document.body.style.overflow = 'auto'; // 스크롤 복구
    };

    // 이전 이미지
    const prevImage = (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    };

    // 다음 이미지
    const nextImage = (e) => {
        e.stopPropagation();
        if (selectedItem && selectedItem.images && currentImageIndex < selectedItem.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    // 키보드 조작 지원
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedItem) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage(e);
            if (e.key === 'ArrowRight') nextImage(e);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem, currentImageIndex]);

    return (
        <>
            {items.length === 0 ? (
                <div className={styles.empty}>
                    <p>등록된 사진이 없습니다.</p>
                    <p className={styles.hint}>Contentful에서 사진을 추가해주세요.</p>
                </div>
            ) : (
                <div className={styles.galleryGrid}>
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className={styles.card}
                            onClick={() => openLightbox(item)}
                        >
                            <div className={styles.imageWrapper}>
                                {item.thumbnail && (
                                    <img src={item.thumbnail} alt={item.title} />
                                )}
                            </div>
                            <div className={styles.info}>
                                <h2 className={styles.title}>{item.title}</h2>
                                <p className={styles.description}>{item.description}</p>
                                <span className={styles.date}>
                                    {item.date && new Date(item.date).toLocaleDateString('ko-KR')}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedItem && (
                <div className={styles.lightbox} onClick={closeLightbox}>
                    <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeLightbox}>&times;</button>

                        <div className={styles.lightboxImageWrapper}>
                            {/* 이전 버튼 */}
                            {selectedItem.images && selectedItem.images.length > 1 && currentImageIndex > 0 && (
                                <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevImage}>
                                    &#10094;
                                </button>
                            )}

                            <img
                                src={selectedItem.images && selectedItem.images.length > 0
                                    ? selectedItem.images[currentImageIndex]
                                    : selectedItem.thumbnail}
                                alt={selectedItem.title}
                                className={styles.lightboxImage}
                            />

                            {/* 다음 버튼 */}
                            {selectedItem.images && selectedItem.images.length > 1 && currentImageIndex < selectedItem.images.length - 1 && (
                                <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextImage}>
                                    &#10095;
                                </button>
                            )}
                        </div>

                        <div className={styles.lightboxInfo}>
                            <h3>{selectedItem.title}</h3>
                            <p className={styles.lightboxDesc}>{selectedItem.description}</p>

                            {/* 인디케이터 (여러 장일 때만 표시) */}
                            {selectedItem.images && selectedItem.images.length > 1 && (
                                <div className={styles.indicator}>
                                    {currentImageIndex + 1} / {selectedItem.images.length}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
