import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* 예배 안내 */}
                    <div className={styles.section}>
                        <h4 className={styles.subtitle}>예배 안내</h4>
                        <ul className={styles.list}>
                            <li>주일 1부예배: 오전 07:30</li>
                            <li>주일 2부예배: 오전 11:00</li>
                            <li>주일오후예배: 오후 2:00 </li>
                            <li>수요예배: 오후 7:30</li>
                            <li>금요기도회: 오후 9:00</li>
                            <li>새벽기도회: 월~금 오전 5:00 </li>
                        </ul>
                    </div>

                    {/* 연락처 */}
                    <div className={styles.section}>
                        <h4 className={styles.subtitle}>연락처</h4>
                        <ul className={styles.list}>
                            <li>📍 경기 구리시 경춘로175번길 38</li>
                            <li>📞 031-554-7658</li>
                        </ul>
                    </div>

                    {/* 빠른 링크 */}
                    <div className={styles.section}>
                        <h4 className={styles.subtitle}>바로가기</h4>
                        <ul className={styles.links}>
                            <li><Link href="/about">교회소개</Link></li>
                            <li><Link href="/faith/sermons">설교</Link></li>
                            <li><Link href="/gallery">갤러리</Link></li>
                            <li><Link href="/about/location">오시는길</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
