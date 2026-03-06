import styles from './pastor.module.css';

export const metadata = {
    title: '목사님소개 - 예인교회',
    description: '예인교회 담임목사님을 소개합니다.',
};

export default function PastorPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>섬기는 이</h1>
                    <p>예인교회를 섬기는 교역자님들</p>
                </div>
            </div>

            <section className={`section ${styles.pastor}`}>
                <div className="container">
                    <div className={styles.pastorGrid}>
                        <div className={styles.pastorImage}>
                            <img src="/pastor2.png" alt="김순원 목사" className={styles.pastorPhoto} />
                        </div>
                        <div className={styles.pastorInfo}>
                            <h2 className={styles.name}>김순원 목사님</h2>
                            <p className={styles.title}>담임목사</p>

                            <div className={styles.bio}>
                                <h3>약력</h3>
                                <ul>
                                    <li>대신대학교(B.A)</li>
                                    <li>총신대학교 신학대학원 M.Div.(목회학 석사)</li>
                                    <li>총신대학교 선교대학원 TH.M.(신학석사)</li>
                                    <li>총신대학교 목회신학전문대학원 TH.D.(신학박사)</li>
                                    <li>미국 Evangelia University D.min.(목회학 박사)</li>
                                    <li>전) 왕성교회(신림동) 부목사 6년 시무</li>
                                    <li>현) D6 코리아 커리큘럼 이사</li>
                                    <li>현) 예인교회 담임(2010년~현재)</li>
                                </ul>
                            </div>


                        </div>
                    </div>

                    {/* 동역자들 섹션 */}
                    <div className={styles.coworkers}>
                        <h2 className={styles.coworkersTitle}>동역자들</h2>
                        <div className={styles.coworkersGrid}>
                            <div className={styles.coworkerCard}>
                                <h3 className={styles.coworkerName}>윤현영 전도사님</h3>
                                <p className={styles.coworkerRole}>다음 세대 담당</p>
                                <ul className={styles.coworkerBio}>
                                    <li>동덕여자대학교</li>
                                    <li>총신대학교 교육대학원</li>
                                </ul>
                            </div>
                            <div className={styles.coworkerCard}>
                                <h3 className={styles.coworkerName}>정주희 사모님</h3>
                                <p className={styles.coworkerRole}>청년부 담당</p>
                                <ul className={styles.coworkerBio}>
                                    <li>대구대학교</li>
                                    <li>서울여자대학교 대학원 가족상담 전공</li>
                                    <li>현) 서울여자대학교 상담실 상담사</li>
                                    <li>현) 파랑하늘마음 심리상담센터 상담사</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
