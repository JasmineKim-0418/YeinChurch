import { getNoticeById } from '@/lib/contentful';
import styles from '../notice.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const p = await params;
    const notice = await getNoticeById(p.id);
    
    if (!notice) {
        return {
            title: '게시글을 찾을 수 없습니다 - 예인교회',
        };
    }

    return {
        title: `${notice.title} - 공지사항 | 예인교회`,
        description: notice.content?.substring(0, 150) || '',
    };
}

export default async function NoticeDetailPage({ params }) {
    const p = await params;
    const notice = await getNoticeById(p.id);

    if (!notice) {
        return notFound();
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>공지사항</h1>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <article className={styles.postDetail}>
                        <div className={styles.postHeader}>
                            <h2 className={styles.postTitle}>{notice.title}</h2>
                            <div className={styles.postMeta}>
                                <span>작성자: {notice.author}</span>
                                <span>날짜: {notice.date && new Date(notice.date).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                        </div>
                        <div className={styles.postBody}>
                            {notice.content}
                        </div>
                        <div className={styles.postFooter}>
                            <Link href="/news/notice" className={styles.backBtn}>
                                목록으로 돌아가기
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}
