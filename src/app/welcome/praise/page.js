import styles from './praise.module.css';
import { getPraisePraises } from '@/lib/contentful';
import Link from 'next/link';

export const metadata = {
    title: '찬양팀 - 예인교회',
    description: '예인교회 찬양팀을 소개합니다.',
};

// 최신 데이터를 항상 가져오기 위해 동적 렌더링 설정
export const dynamic = 'force-dynamic';

// YouTube URL에서 비디오 ID 추출
function getYouTubeVideoId(url) {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export default async function PraisePage() {
    const praisePraises = await getPraisePraises();

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>셀라 찬양팀</h1>
                    <p>은혜로운 찬양으로 예배를 인도합니다</p>
                </div>
            </div>

            <section className={`section ${styles.intro}`}>
                <div className="container">
                    <div className={styles.introContent}>
                        <div className={styles.introImage}>
                            <img
                                src="/sella.png"
                                alt="예인교회 찬양팀 모습"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '16px',
                                    boxShadow: 'var(--shadow-lg)',
                                    objectFit: 'cover',
                                    aspectRatio: '4/3'
                                }}
                            />
                        </div>
                        <div className={styles.introText}>
                            <h2>셀라 찬양팀</h2>
                            <p>
                                셀라 찬양팀은 ‘셀라(Selah)’라는 이름처럼, 찬양 가운데 잠시 멈추어 하나님을 묵상하고, 마음을 다해 주님을 높이 올려드리는 예배 준비 찬양팀입니다.
                                예배의 시작을 준비하는 찬양을 통해 성도들의 시선과 마음이 하나님께 향하도록 돕고, 예배의 자리로 나아가도록 섬기고 있습니다.
                            </p>
                            <p>
                                매주 함께 기도로 준비하고 연습하며, 찬양으로 예배의 문을 열고 하나님께 영광 돌리는 사명을 감당하고 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 찬양팀 영상 섹션 (데이터가 있을 때만 표시) */}
            {praisePraises.length > 0 && (
                <section className={`section ${styles.videoSection}`}>
                    <div className="container">
                        <h2 className="section-title underline">찬양팀 영상</h2>
                        <div className={styles.sermonGrid}>
                            {praisePraises.slice(0, 3).map((praise) => {
                                const videoId = getYouTubeVideoId(praise.youtubeUrl);
                                return (
                                    <Link
                                        href={`https://www.youtube.com/watch?v=${videoId}`}
                                        target="_blank"
                                        key={praise.id}
                                        className={`card ${styles.sermonCard}`}
                                    >
                                        <div className={styles.sermonThumbnail}>
                                            {videoId ? (
                                                <img
                                                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                                    alt={praise.title}
                                                    className={styles.thumbnailImg}
                                                />
                                            ) : (
                                                <div className={styles.thumbnailPlaceholder}></div>
                                            )}
                                            <div className={styles.playOverlay}>
                                                <div className={styles.playIcon}>▶</div>
                                            </div>
                                        </div>
                                        <div className={styles.sermonInfo}>
                                            <span className={styles.sermonDate}>
                                                {praise.date && praise.date.substring(0, 10).replace(/-/g, '. ')}
                                            </span>
                                            <h3 className={styles.sermonTitle}>{praise.title}</h3>
                                            <p className={styles.sermonTeam}>셀라 찬양팀</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
