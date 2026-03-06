'use client';

import { useState, useEffect } from 'react';
import styles from './sermons.module.css';

// YouTube URL에서 비디오 ID 추출 (보강된 버전)
function getYouTubeVideoId(url) {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export default function SermonsClient({ initialSermons }) {
    const [selectedSermon, setSelectedSermon] = useState(initialSermons[0]);
    const [videoId, setVideoId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (selectedSermon) {
            setVideoId(getYouTubeVideoId(selectedSermon.youtubeUrl));
        }
    }, [selectedSermon]);

    // 주소창에 id 파라미터가 있으면 해당 설교 선택
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sermonId = params.get('id');
        if (sermonId) {
            const found = initialSermons.find(s => s.id === sermonId);
            if (found) setSelectedSermon(found);
        }
    }, [initialSermons]);

    if (initialSermons.length === 0) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>등록된 설교가 없습니다.</div>;
    }

    // Pagination calculations
    const totalPages = Math.ceil(initialSermons.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSermons = initialSermons.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // 리스트 시작 부분으로 스크롤 (섹션 타이틀 부근)
        const listSection = document.getElementById('sermon-list-section');
        if (listSection) {
            listSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* 최신/선택된 설교 (하이라이트) */}
            <section className={`section ${styles.featured}`}>
                <div className="container">
                    <div className={styles.featuredContent}>
                        <div className={styles.featuredVideo}>
                            {videoId ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                    title={selectedSermon.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className={styles.errorContainer}>
                                    <p>영상을 불러올 수 없습니다. <br />주소를 확인해주세요: {selectedSermon.youtubeUrl}</p>
                                </div>
                            )}
                        </div>
                        <div className={styles.featuredInfo}>
                            <span className={styles.featuredBadge}>
                                {selectedSermon.id === initialSermons[0].id ? '최신 설교' : '선택된 설교'}
                            </span>
                            <h2 className={styles.featuredTitle}>
                                {selectedSermon.title.includes('(') ? (
                                    <>
                                        {selectedSermon.title.split('(')[0]}
                                        <br />
                                        ({selectedSermon.title.split('(').slice(1).join('(')}
                                    </>
                                ) : (
                                    selectedSermon.title
                                )}
                            </h2>
                            <p className={styles.featuredMeta}>
                                {selectedSermon.date && new Date(selectedSermon.date).toLocaleDateString('ko-KR')} | {selectedSermon.preacher}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 설교 목록 */}
            <section id="sermon-list-section" className={`section ${styles.list}`}>
                <div className="container">
                    <h2 className="section-title underline">설교 목록</h2>

                    <div className={styles.tableContainer}>
                        <div className={styles.listHeader}>
                            <span className={styles.colNum}>번호</span>
                            <span className={styles.colTitle}>제목</span>
                            <span className={styles.colPreacher}>설교자</span>
                            <span className={styles.colDate}>날짜</span>
                        </div>

                        <div className={styles.listBody}>
                            {currentSermons.map((sermon, index) => {
                                const isSelected = selectedSermon.id === sermon.id;
                                // 전체 목록에서의 순서 (내림차순 번호 유지)
                                const sermonNumber = initialSermons.length - (indexOfFirstItem + index);

                                return (
                                    <div
                                        key={sermon.id}
                                        className={`${styles.listRow} ${isSelected ? styles.activeRow : ''}`}
                                        onClick={() => {
                                            setSelectedSermon(sermon);
                                            window.scrollTo({ top: 150, behavior: 'smooth' });
                                        }}
                                    >
                                        <span className={styles.colNum}>{sermonNumber}</span>
                                        <span className={styles.colTitle}>
                                            {sermon.title.includes('(') ? (
                                                <>
                                                    {sermon.title.split('(')[0]}
                                                    <br />
                                                    ({sermon.title.split('(').slice(1).join('(')}
                                                </>
                                            ) : (
                                                sermon.title
                                            )}
                                        </span>
                                        <span className={styles.colPreacher}>{sermon.preacher}</span>
                                        <span className={styles.colDate}>
                                            {sermon.date && new Date(sermon.date).toLocaleDateString('ko-KR')}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pagination Buttons */}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                                disabled={currentPage === 1}
                            >
                                ←
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                                disabled={currentPage === totalPages}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
