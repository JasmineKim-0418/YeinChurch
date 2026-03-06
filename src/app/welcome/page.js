import Link from 'next/link';
import styles from './welcome.module.css';

export const metadata = {
    title: '섬김/사역 - 예인교회',
    description: '예인교회의 다양한 섬김과 사역 팀을 소개합니다.',
};

const teams = [
    {
        title: '성가대',
        description: '아름다운 찬양으로 하나님께 영광을 돌리는 성가대',
        icon: '/icon-bible.png',
        isImage: true,
        link: '/welcome/choir',
    },
    {
        title: '찬양팀',
        description: '은혜로운 찬양으로 예배를 인도하는 찬양팀',
        icon: '/icon-guitar.png',
        isImage: true,
        link: '/welcome/praise',
    },
    {
        title: '전도팀',
        description: '세상에 복음을 전하는 전도팀',
        icon: '/icon-sound.png',
        isImage: true,
        link: '/welcome/evangelism',
    },
    {
        title: '중보기도팀',
        description: '교회와 성도를 위해 기도하는 중보기도팀',
        icon: '/icon-prayer.png',
        isImage: true,
        link: '/welcome/intercession',
    },
];

export default function WelcomePage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>섬김/사역</h1>
                    <p>주님의 몸 된 교회를 함께 세워가는 동역자들</p>
                </div>
            </div>

            <section className={`section ${styles.teams}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {teams.map((item, index) => (
                            <Link href={item.link} key={index} className={styles.card}>
                                <div className={styles.icon}>
                                    {item.isImage ? (
                                        <img
                                            src={item.icon}
                                            alt={item.title}
                                            className={styles.iconImg}
                                        />
                                    ) : (
                                        item.icon
                                    )}
                                </div>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <span className={styles.arrow}>→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
