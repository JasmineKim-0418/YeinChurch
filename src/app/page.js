import styles from './page.module.css';
import Link from 'next/link';
import { getSermons } from '@/lib/contentful';
import MainSlider from '@/components/MainSlider';

// YouTube URL에서 비디오 ID 추출
function getYouTubeVideoId(url) {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// 60초마다 새 데이터 확인
export const revalidate = 60;

export default async function Home() {
  const sermons = await getSermons();
  const latestSermons = sermons.slice(0, 3);

  return (
    <>
      {/* 히어로 슬라이더 */}
      <MainSlider />

      {/* 소개 섹션 */}
      <section className={`section ${styles.intro} fade-in-section`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introContent}>
              <h2 className={styles.introTitle}>
                함께 예배하고
                <br />
                함께 성장하는 공동체
              </h2>
              <p className={styles.introDesc}>
                예인교회는 개혁주의 신학에 기반한 교단인 대한예수교장로회(합동) 평양노회에
                소속되어 있습니다. 합동 교단과 함께하는 학교는 <br />총신대학교(사당동)입니다.
              </p>
              <Link href="/about" className="btn btn-primary">
                더 알아보기
              </Link>
            </div>
            <div className={styles.introImage}>
              <img
                src="/yeinchurch.png"
                alt="구리 예인교회 전경"
                className={styles.introImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 최신 설교 섹션 */}
      <section className={`section ${styles.sermons} fade-in-section`}>
        <div className="container">
          <h2 className="section-title underline">최근 설교</h2>
          <div className={styles.sermonGrid}>
            {latestSermons.map((sermon) => {
              const videoId = getYouTubeVideoId(sermon.youtubeUrl);
              return (
                <Link
                  href={`/faith/sermons?id=${sermon.id}`}
                  key={sermon.id}
                  className={`card ${styles.sermonCard}`}
                >
                  <div className={styles.sermonThumbnail}>
                    {videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={sermon.title}
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
                      {sermon.date && new Date(sermon.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }).replace(/\. /g, '.').replace(/\.$/, '')}
                    </span>
                    <h3 className={styles.sermonTitle}>
                      {sermon.title.includes('(') ? (
                        <>
                          {sermon.title.split('(')[0]}
                          <br />
                          ({sermon.title.split('(').slice(1).join('(')}
                        </>
                      ) : (
                        sermon.title
                      )}
                    </h3>
                    <p className={styles.sermonPreacher}>{sermon.preacher}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.sermonMore}>
            <Link href="/faith/sermons" className="btn btn-secondary">
              설교 더보기
            </Link>
          </div>
        </div>
      </section>


      {/* 빠른 링크 섹션 */}
      <section className={`section ${styles.quickLinks} fade-in-section`}>
        <div className="container">
          <div className={styles.quickGrid}>
            <Link href="/about/worship" className={styles.quickCard}>
              <div className={styles.quickIcon}>
                <img src="/icon-clock.png" alt="예배 시간" style={{ width: '48px', height: '48px' }} />
              </div>
              <h3>예배 시간</h3>
              <p>예배 시간을 확인하세요</p>
            </Link>
            <Link href="/about/location" className={styles.quickCard}>
              <div className={styles.quickIcon}>
                <img src="/icon-bullet.png" alt="오시는 길" style={{ width: '48px', height: '48px' }} />
              </div>
              <h3>오시는 길</h3>
              <p>교회 위치 안내</p>
            </Link>
            <Link href="/about" className={styles.quickCard}>
              <div className={styles.quickIcon}>
                <img src="/icon-church.png" alt="교회 소개" style={{ width: '48px', height: '48px' }} />
              </div>
              <h3>교회 소개</h3>
              <p>예인교회를 소개합니다</p>
            </Link>
            <Link href="/about/pastor" className={styles.quickCard}>
              <div className={styles.quickIcon}>
                <img src="/icon-pastor.png" alt="목사님 소개" style={{ width: '48px', height: '48px' }} />
              </div>
              <h3>섬기는 이</h3>
              <p>교역자님들을 소개합니다</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
