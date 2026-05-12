'use client';

import Link from 'next/link';
import styles from './gallery.module.css';

export default function GalleryClient({ items }) {
    return (
        <div className={styles.galleryWrapper}>
            {items.length === 0 ? (
                <div className={styles.empty}>
                    <p>등록된 사진이 없습니다.</p>
                </div>
            ) : (
                <div className={styles.galleryGrid}>
                    {items.map((item) => (
                        <Link href={`/gallery/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                            <article className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    {item.thumbnail && (
                                        <img 
                                            src={item.thumbnail} 
                                            alt={item.title} 
                                            className={styles.thumbnail} 
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
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
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
