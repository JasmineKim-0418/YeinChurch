import { getMeditationById } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '../../column/[id]/detail.module.css';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const meditation = await getMeditationById(id);

    if (!meditation) {
        return { title: '묵상을 찾을 수 없습니다' };
    }

    return {
        title: `${meditation.title} - 예인교회`,
        description: `${meditation.author}님의 새벽묵상`,
    };
}

export default async function MeditationDetailPage({ params }) {
    const { id } = await params;
    const meditation = await getMeditationById(id);

    if (!meditation) {
        notFound();
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>새벽묵상</h1>
                    <p>매일 아침 전해지는 은혜의 말씀</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <article className={styles.article}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>{meditation.title}</h1>
                            <div className={styles.meta}>
                                <span className={styles.author}>✍️ {meditation.author}</span>
                                <span className={styles.date}>
                                    {meditation.date && new Date(meditation.date).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </header>

                        <div className={styles.content}>
                            {meditation.content && documentToReactComponents(meditation.content)}
                        </div>

                        <footer className={styles.footer}>
                            <Link href="/faith/meditation" className={styles.backLink}>
                                ← 목록으로 돌아가기
                            </Link>
                        </footer>
                    </article>
                </div>
            </section>
        </>
    );
}
