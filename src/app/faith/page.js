import Link from 'next/link';
import styles from './faith.module.css';

export const metadata = {
    title: '신앙생활 - 예인교회',
    description: '예인교회의 설교, 복음, 칼럼을 만나보세요.',
};

const categories = [
    {
        title: '설교',
        description: '주일 예배 말씀을 영상으로 만나보세요',
        icon: '/icon-sermon.png',
        isImage: true,
        link: '/faith/sermons',
    },
    {
        title: '칼럼',
        description: '신앙 성장을 위한 칼럼을 읽어보세요',
        icon: '/icon-column.png',
        isImage: true,
        link: '/faith/column',
    },
    {
        title: '새벽묵상',
        description: '매일 아침 말씀 묵상으로 하루를 시작하세요',
        icon: '/icon-qt.png',
        isImage: true,
        link: '/faith/meditation',
    },
];

export default function FaithPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>신앙생활</h1>
                    <p>말씀과 함께 성장하는 신앙생활</p>
                </div>
            </div>

            <section className={`section ${styles.categories}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {categories.map((item, index) => (
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
