import styles from './about.module.css';

export const metadata = {
    title: '교회소개 - 예인교회',
    description: '예인교회를 소개합니다. 하나님의 사랑으로 세상을 품는 교회입니다.',
};

export default function AboutPage() {
    return (
        <>
            {/* 페이지 헤더 */}
            <div className="page-header">
                <div className="container">
                    <h1>교회소개</h1>
                    <p>아름다운 예수님의 가족들이 모인 예인교회</p>
                </div>
            </div>

            {/* 비전 섹션 */}
            <section className={`section ${styles.vision} fade-in-section`}>
                <div className="container">
                    <div className={styles.visionContent}>
                        <h2 className={styles.visionTitle}>예인교회의 4대 비전</h2>
                        <p className={styles.visionVerse}>
                        </p>
                        <div className={styles.visionCards}>
                            <div className={styles.visionCard}>
                                <div className={styles.visionIcon}>
                                    <img
                                        src="/icon-vision-prayer.png"
                                        alt="Prayer"
                                        className={styles.iconImg}
                                    />
                                </div>
                                <h3>1. 균형 잡힌 신앙 공동체</h3>
                                <p>모든 성도가 말씀을 가까이하고 기도로 깨어 있어, 삶의 모든 자리에서 하나님의 영광을 드러내는 균형 잡힌 교회를 지향합니다.</p>
                            </div>
                            <div className={styles.visionCard}>
                                <div className={styles.visionIcon}>
                                    <img
                                        src="/icon-house.png"
                                        alt="Family"
                                        className={styles.iconImg}
                                    />
                                </div>
                                <h3>2. 가족 같은 따뜻한 공동체</h3>
                                <p>어린아이부터 어르신까지 전 세대가 어우러져 서로를 위해 기도하며, 그리스도의 사랑을 나누는 가족 중심의 교회입니다.</p>
                            </div>
                            <div className={styles.visionCard}>
                                <div className={styles.visionIcon}>
                                    <img
                                        src="/icon-student2.png"
                                        alt="Family"
                                        className={styles.iconImg}
                                    />
                                </div>
                                <h3>3. 다음 세대를 세우는 공동체</h3>
                                <p>자녀들이 올바른 성경적 가치관을 지닌 신실한 성도로 성장하여, 미래의 리더로서 세상에 선한 영향력을 끼치도록 세대 간 신앙 전수에 힘씁니다.</p>
                            </div>
                            <div className={styles.visionCard}>
                                <div className={styles.visionIcon}>
                                    <img
                                        src="/icon-vision-heart.png"
                                        alt="Love"
                                        className={styles.iconImg}
                                    />
                                </div>
                                <h3>4. 사랑으로 이웃을 섬기는 공동체</h3>
                                <p>예수님의 마음으로 소외된 이웃을 돌보고 지역사회의 아픔에 공감하며, 복음의 빛을 전하는 사랑의 손길이 있는 교회입니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 교회 소개 */}
            <section className={`section ${styles.about} fade-in-section`}>
                <div className="container">
                    <div className={styles.aboutGrid}>
                        <div className={styles.aboutImage}>
                            <img
                                src="/church_bg.jpeg"
                                alt="교회 전경 이미지"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '12px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    objectFit: 'cover',
                                    objectPosition: 'bottom',
                                    aspectRatio: '4/3'
                                }}
                            />
                        </div>
                        <div className={styles.aboutContent}>
                            <h2 className={styles.aboutTitle}>예인교회를 소개합니다</h2>
                            <p className={styles.aboutText}>
                                예인교회는 좋은 건물과 많은 사람이 모이는 공동체는 아닙니다. <br className={styles.pcBreak} />
                                하지만 예인교회는 참 좋은 교회입니다. <br className={styles.pcBreak} />
                                좋으신 하나님의 말씀을 진실하게 선포하는 따뜻한 목사님과 <br className={styles.pcBreak} />
                                말씀대로 살려고 애쓰는 좋은 성도들이 함께하기 때문입니다.
                            </p>
                            <p className={styles.aboutText}>
                                예인교회는 3대가 함께 예배드리며
                                세대 간 신앙 전수를 중요한 <br className={styles.pcBreak} /> 믿음의 가치로 여기며
                                믿음의 명문가를 세우기 위해서 노력하고 있습니다.
                            </p>
                            <p className={styles.aboutText}>
                                우리 예인교회 홈페이지를 방문해 주신 여러분을 진심으로 환영하며 <br className={styles.pcBreak} />
                                하나님의 은혜와 평강이 늘 함께하시길 기원합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 핵심 가치
            <section className={`section ${styles.values} fade-in-section`}>
                <div className="container">
                    <h2 className="section-title">핵심 가치</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueItem}>
                            <span className={styles.valueNumber}>01</span>
                            <h3>진정한 예배</h3>
                            <p>하나님께 영과 진리로 드리는 예배가 우리의 최우선입니다.</p>
                        </div>
                        <div className={styles.valueItem}>
                            <span className={styles.valueNumber}>02</span>
                            <h3>깊은 교제</h3>
                            <p>그리스도 안에서 서로를 사랑하고 돌보는 공동체입니다.</p>
                        </div>
                        <div className={styles.valueItem}>
                            <span className={styles.valueNumber}>03</span>
                            <h3>말씀 훈련</h3>
                            <p>하나님의 말씀을 배우고 삶에 적용하는 것을 추구합니다.</p>
                        </div>
                        <div className={styles.valueItem}>
                            <span className={styles.valueNumber}>04</span>
                            <h3>선교와 섬김</h3>
                            <p>지역사회와 세상을 향해 복음을 전하고 섬깁니다.</p>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}
