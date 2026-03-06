import styles from '../praise/praise.module.css';

export const metadata = {
    title: '중보기도팀 - 예인교회',
    description: '교회와 성도를 위해 기도하는 예인교회 중보기도팀입니다.',
};

export default function IntercessionPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>예인교회 중보기도팀</h1>
                    <p>기도로 마음을 모아 하늘 문을 엽니다</p>
                </div>
            </div>

            <section className={`section ${styles.intro}`}>
                <div className="container">
                    <div className={styles.introContent}>
                        <div className={styles.introImage}>
                            <img
                                src="/letsgo.jpeg"
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
                            <h2>사닥다리 중보기도팀</h2>
                            <p>
                                중보기도팀은 교회와 성도, 그리고 나라와 민족을 위해
                                하나님의 뜻이 이 땅 가운데 이루어지기를 간절히 기도하는 기도의 파수꾼입니다.
                            </p>
                            <p>
                                기도의 힘을 믿으며, 아파하는 이웃들과 공동체의 제목들을 내 일처럼 품고
                                주님 앞에 나아갑니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.schedule}`}>
                <div className="container">
                    <div className={styles.scheduleBox}>
                        <h3>📅 기도시간 안내</h3>
                        <div className={styles.scheduleGrid}>
                            <div className={styles.scheduleItem}>
                                <strong>정기 기도회</strong>
                                <p>매주 수요예배 후 오후 8:30</p>
                            </div>
                            <div className={styles.scheduleItem}>
                                <strong>장소</strong>
                                <p>교회 1층 청년부실</p>
                            </div>
                        </div>
                        <p className={styles.joinNote}>
                            기도의 사명을 함께 감당하실 성도님들을 기다립니다.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
