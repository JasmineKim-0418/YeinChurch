import { getNoticeById } from '@/lib/contentful';
import styles from '../notice.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export const revalidate = 60;

const richTextOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const url = node.data?.target?.fields?.file?.url;
            const title = node.data?.target?.fields?.title || '공지사항 이미지';
            if (url) {
                const imageUrl = url.startsWith('//') ? `https:${url}` : url;
                return (
                    <div className={styles.postImageWrapper}>
                        <img
                            src={imageUrl}
                            alt={title}
                            className={styles.postImage}
                        />
                    </div>
                );
            }
            return null;
        },
        [INLINES.EMBEDDED_ASSET]: (node) => {
            const url = node.data?.target?.fields?.file?.url;
            const title = node.data?.target?.fields?.title || '공지사항 이미지';
            if (url) {
                const imageUrl = url.startsWith('//') ? `https:${url}` : url;
                return (
                    <img
                        src={imageUrl}
                        alt={title}
                        className={styles.postImage}
                        style={{ display: 'inline-block' }}
                    />
                );
            }
            return null;
        },
    },
};

export async function generateMetadata({ params }) {
    const p = await params;
    const notice = await getNoticeById(p.id);
    
    if (!notice) {
        return {
            title: '게시글을 찾을 수 없습니다 - 예인교회',
        };
    }

    const description = typeof notice.content === 'string'
        ? notice.content.substring(0, 150)
        : notice.title;

    return {
        title: `${notice.title} - 공지사항 | 예인교회`,
        description,
    };
}

export default async function NoticeDetailPage({ params }) {
    const p = await params;
    const notice = await getNoticeById(p.id);

    if (!notice) {
        return notFound();
    }

    const hasImages = notice.images && notice.images.length > 0;

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
                            {hasImages ? (
                                <div className={styles.postImageWrapper} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                                    {notice.images.map((imgUrl, idx) => (
                                        <img key={idx} src={imgUrl} alt={`${notice.title} ${idx + 1}`} className={styles.postImage} />
                                    ))}
                                </div>
                            ) : notice.image ? (
                                <div className={styles.postImageWrapper}>
                                    <img src={notice.image} alt={notice.title} className={styles.postImage} />
                                </div>
                            ) : null}

                            <div className={styles.postText}>
                                {typeof notice.content === 'string' ? (
                                    <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{notice.content}</div>
                                ) : notice.content && typeof notice.content === 'object' ? (
                                    documentToReactComponents(notice.content, richTextOptions)
                                ) : null}
                            </div>
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
