import Link from 'next/link';
import styles from './counseling.module.css';

export const metadata = {
    title: '상담센터 - 예인교회',
    description: '예인교회 상담센터에서 다양한 상담 서비스를 제공합니다.',
};

const categories = [
    '아동 놀이치료',
    '부부 상담',
    '청소년 상담',
    '가족 상담'
];

export default function CounselingPage() {
    return (
        <>
            <div className={styles.bannerWrapper}>
                <picture>
                    <source media="(max-width: 900px)" srcSet="/sky-banner-mobile.png" />
                    <img src="/sky-banner.png" alt="상담센터 배너" className={styles.bannerImage} />
                </picture>
            </div>

            <section className={`section ${styles.intro}`}>
                <div className="container">
                    <div className={styles.introContent}>
                        <h2>함께 나누고, 함께 회복합니다</h2>
                        <p>
                            파랑하늘마음 심리상담센터는 예인교회부설로서<br />
                            기독교 정신을 바탕으로 한사람 한사람의 이야기를 귀 기울여 듣고<br />
                            함께 해결책을 찾아가며 치유와 회복을 돕는 따뜻한 상담을 지향합니다.
                        </p>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.services}`}>
                <div className="container">
                    <div className={styles.categoryGrid}>
                        {categories.map((category, index) => (
                            <div key={index} className={styles.categoryCard}>
                                {category}
                            </div>
                        ))}
                    </div>
                    <div className={styles.telInfo}>
                        상담문의: 010-3206-4696
                    </div>
                </div>
            </section>
        </>
    );
}

