import styles from './choir.module.css';
import { getChoirPraises, getSermons } from '@/lib/contentful';
import Link from 'next/link';

export const metadata = {
    title: '성가대 - 예인교회',
    description: '예인교회 성가대를 소개합니다.',
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

export default async function ChoirPage() {
    let choirPraises = await getChoirPraises();

    // 만약 전용 데이터가 없으면 기존처럼 설교에서 필터링해서 보여줌 (호환성 유지)
    if (choirPraises.length === 0) {
        const sermons = await getSermons();
        choirPraises = sermons.filter(s =>
            s.title.includes('찬양') ||
            s.title.includes('성가대') ||
            s.title.includes('특송')
        ).slice(0, 3);

        if (choirPraises.length === 0) {
            choirPraises = sermons.slice(0, 3);
        }
    } else {
        choirPraises = choirPraises.slice(0, 3);
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>호산나 성가대</h1>
                    <p>아름다운 찬양으로 하나님께 영광을</p>
                </div>
            </div>

            <section className={`section ${styles.intro}`}>
                <div className="container">
                    <div className={styles.introContent}>
                        <div className={styles.introText}>
                            <h2>호산나 성가대</h2>
                            <p>
                                호산나 성가대는 ‘호산나(구원하소서)’라는 뜻처럼, 하나님께 간절한 마음으로 찬양을 올려드리며 주일 예배를 찬양으로 섬기는 성가대입니다.
                                찬양을 통해 성도들의 마음이 하나님께 향하고, 예배 가운데 은혜와 감동이 더욱 깊어지도록 돕는 역할을 감당하고 있습니다.
                            </p>
                            <p>
                                예배를 앞두고 마음을 모아 기도로 준비하며, 정성된 연습을 통해 한 목소리로 하나님께 영광 돌리는 찬양을 올려드리고 있습니다.
                            </p>
                        </div>
                        <div className={styles.introImage}>
                            <img
                                src="/choir_3.jpeg"
                                alt="예인교회 성가대 찬양 모습"
                                className={styles.introImg}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 성가대 찬양 영상 섹션 */}
            <section className={`section ${styles.praise}`}>
                <div className="container">
                    <h2 className="section-title underline">최근 성가대 찬양</h2>
                    <div className={styles.sermonGrid}>
                        {choirPraises.map((praise) => {
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
                                        <p className={styles.sermonPreacher}>예인교회 성가대</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className={styles.sermonMore}>
                        <Link href="https://www.youtube.com/@stefanochoi8851" target="_blank" className="btn btn-secondary">
                            성가대 유튜브 채널 바로가기
                        </Link>
                    </div>
                </div>
            </section>


        </>
    );
}
