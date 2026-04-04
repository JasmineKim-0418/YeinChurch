'use client';

import { useState, useEffect } from 'react';
import styles from './gallery.module.css';

export default function GalleryClient({ items }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 팝업 열기 (게시글 상세 보기 형태)
    const openPost = (item) => {
        setSelectedItem(item);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    // 팝업 닫기
    const closePost = () => {
        setSelectedItem(null);
        document.body.style.overflow = 'auto';
    };

    // 이전/다음 이미지
    const prevImage = (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) setCurrentImageIndex(prev => prev - 1);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (selectedItem?.images && currentImageIndex < selectedItem.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedItem) return;
            if (e.key === 'Escape') closePost();
            if (e.key === 'ArrowLeft') prevImage(e);
            if (e.key === 'ArrowRight') nextImage(e);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem, currentImageIndex]);

    return (
        <div className={styles.galleryWrapper}>
            {items.length === 0 ? (
                <div className={styles.empty}>
                    <p>등록된 사진이 없습니다.</p>
                </div>
            ) : (
                <div className={styles.galleryGrid}>
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className={styles.card}
                            onClick={() => openPost(item)}
                        >
                            <div className={styles.imageWrapper}>
                                {item.thumbnail && (
                                    <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
                                )}
                                <div className={styles.overlay}>
                                    <span>상세보기</span>
                                </div>
                            </div>
                            <div className={styles.cardInfo}>
                                <h2 className={styles.cardTitle}>{item.title}</h2>
                                <span className={styles.cardDate}>
                                    {item.date && new Date(item.date).toLocaleDateString('ko-KR')}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Board Style Detail Modal */}
            {selectedItem && (
                <div className={styles.modalOverlay} onClick={closePost}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeModalBtn} onClick={closePost}>&times;</button>

                        <div className={styles.modalScrollArea}>
                            <header className={styles.modalHeader}>
                                <h1 className={styles.modalTitle}>{selectedItem.title}</h1>
                                <div className={styles.modalMeta}>
                                    <span className={styles.modalDate}>
                                        📅 {selectedItem.date && new Date(selectedItem.date).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </header>

                            <div className={styles.modalBody}>
                                <div className={styles.imageFeed}>
                                    {selectedItem.images && selectedItem.images.length > 0 ? (
                                        selectedItem.images.map((img, idx) => (
                                            <div key={idx} className={styles.feedImageBox}>
                                                <img
                                                    src={img}
                                                    alt={`${selectedItem.title} - ${idx + 1}`}
                                                    className={styles.fullImage}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.feedImageBox}>
                                            <img
                                                src={selectedItem.thumbnail}
                                                alt={selectedItem.title}
                                                className={styles.fullImage}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={styles.contentArea}>
                                    <p className={styles.fullDescription}>
                                        {selectedItem.description}
                                    </p>
                                </div>
                            </div>

                            <footer className={styles.modalFooter}>
                                <button className={styles.backBtn} onClick={closePost}>목록으로</button>
                            </footer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
