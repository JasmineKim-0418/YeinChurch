import styles from './location.module.css';
import Link from 'next/link';

export const metadata = {
    title: '오시는길 - 구리 예인교회',
    description: '예인교회 오시는 길 안내입니다. 경기 구리시 경춘로175번길 38',
    keywords: '구리 예인교회 오시는길, 구리시 교회 위치, 교문동 교회 추천, 구리역 주변 교회, 한양대구리병원 근처 교회',

};

export default function LocationPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>오시는길</h1>
                    <p>예인교회를 찾아오시는 방법</p>
                </div>
            </div>

            <section className={`section ${styles.location}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* 지도 영역 */}
                        <div className={styles.mapArea}>
                            <div className={styles.mapContainer}>
                                {/* 구글 지도로 실제 위치 표시 (가장 안정적) */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.165373690255!2d127.1299733892718!3d37.60154561014105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb0a58fb3c5a7%3A0x5a52c82f9d6989cb!2z6rK96riw64-EIOq1rOumrOyLnCDqsr3stpjroZwxNzXrsojquLggMzg!5e0!3m2!1sko!2skr!4v1769349722572!5m2!1sko!2skr"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="예인교회 위치"
                                ></iframe>
                            </div>
                            <div className={styles.mapButtons}>
                                <Link
                                    href="https://naver.me/GCgVJ11G"
                                    target="_blank"
                                    className={styles.naverBtn}
                                >
                                    🗺️ 네이버 지도로 보기
                                </Link>
                                <Link
                                    href="https://map.kakao.com/link/search/%EA%B2%BD%EA%B8%B0%20%EA%B5%AC%EB%A6%AC%EC%8B%9C%20%EA%B2%BD%EC%B6%98%EB%A1%9C175%EB%B2%88%EA%B8%B8%2038"
                                    target="_blank"
                                    className={styles.kakaoBtn}
                                >
                                    🗺️ 카카오맵으로 보기
                                </Link>
                            </div>
                        </div>

                        {/* 정보 영역 */}
                        <div className={styles.infoArea}>
                            <div className={styles.infoCard}>
                                <h2>주소</h2>
                                <div className={styles.infoItem}>
                                    <span className={styles.icon}>📍</span>
                                    <div>
                                        <p className={styles.address}>경기 구리시 경춘로175번길 38</p>
                                        <p className={styles.zipcode}>(지번) 교문동 233-52</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <h2>연락처</h2>
                                <div className={styles.infoItem}>
                                    <span className={styles.icon}>📞</span>
                                    <div>
                                        <p>전화: 031-554-7658</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <h2>대중교통</h2>
                                <div className={styles.transport}>
                                    <div className={styles.transportItem}>
                                        <span className={styles.transportIcon}>🚇</span>
                                        <div>
                                            <strong>지하철</strong>
                                            <p>8호선, 경의중앙선</p>
                                            <p className={styles.distance}>구리역 7번 출구에서 약 961m (도보 약 15분)</p>
                                        </div>
                                    </div>
                                    <div className={styles.transportItem}>
                                        <span className={styles.transportIcon}>🚌</span>
                                        <div>
                                            <strong>버스</strong>
                                            <p>교문사거리 또는 한양대구리병원 정류장 이용</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <h2>주차 안내</h2>
                                <div className={styles.infoItem}>
                                    <span className={styles.icon}>🚗</span>
                                    <div>
                                        <p>교회 옆 주차장 이용 가능</p>
                                        <p className={styles.parkingNote}>예배 시간에는 주차 공간이 부족할 수 있습니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
