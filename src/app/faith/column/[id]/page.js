import { getColumnById } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './detail.module.css';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const column = await getColumnById(id);

    if (!column) {
        return { title: '칼럼을 찾을 수 없습니다' };
    }

    return {
        title: `${column.title} - 예인교회`,
        description: `${column.author}님의 칼럼`,
    };
}

export default async function ColumnDetailPage({ params }) {
    const { id } = await params;
    const column = await getColumnById(id);

    if (!column) {
        notFound();
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>칼럼</h1>
                    <p>신앙 성장을 위한 글</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <article className={styles.article}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>{column.title}</h1>
                            <div className={styles.meta}>
                                <span className={styles.author}>✍️ {column.author}</span>
                                <span className={styles.date}>
                                    {column.date && new Date(column.date).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </header>

                        <div className={styles.content}>
                            {column.content && documentToReactComponents(column.content)}
                        </div>

                        <footer className={styles.footer}>
                            <Link href="/faith/column" className={styles.backLink}>
                                ← 목록으로 돌아가기
                            </Link>
                        </footer>
                    </article>
                </div>
            </section>
        </>
    );
}
