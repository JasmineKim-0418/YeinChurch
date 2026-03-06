import styles from '../praise/praise.module.css';

export const metadata = {
    title: '전도팀 - 예인교회',
    description: '세상에 복음을 전하는 예인교회 전도팀입니다.',
};

export default function EvangelismPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>전도팀</h1>
                    <p>땅끝까지 주의 복음을 전합니다</p>
                </div>
            </div>

            <section className={`section ${styles.intro}`}>
                <div className="container">
                    <div className={styles.introContent}>
                        <div className={styles.introImage}>
                            <img
                                src="/pray.jpeg"
                                alt="전도팀 활동 사진"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '16px',
                                    boxShadow: 'var(--shadow-lg)',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className={styles.introText}>
                            <h2>예인교회 전도팀</h2>
                            <p>
                                전도팀은 우리 주변의 이웃들에게 예수 그리스도의 기쁜 소식을 전하며,
                                하나님의 사랑을 실천하는 사역을 감당하고 있습니다.
                            </p>
                            <p>
                                매주 정기적인 노방전도와 관계전도를 통해
                                잃어버린 영혼들을 주님께로 인도하는 일에 앞장섭니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.schedule}`}>
                <div className="container">
                    <div className={styles.scheduleBox}>
                        <h3>📅 활동 안내</h3>
                        <div className={styles.scheduleGrid}>
                            <div className={styles.scheduleItem}>
                                <strong>정기 전도</strong>
                                <p>첫째·셋째 토요일 오후 1시</p>
                            </div>
                            <div className={styles.scheduleItem}>
                                <strong>모임 장소</strong>
                                <p>교회 1층</p>
                            </div>
                        </div>
                        <p className={styles.joinNote}>
                            복음 전파의 기쁨을 함께 누리고 싶은 성도님들은 언제든 환영합니다!
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
