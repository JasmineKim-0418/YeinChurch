import { getBulletinById } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../column/[id]/detail.module.css';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const bulletin = await getBulletinById(id);

    if (!bulletin) {
        return { title: '주보를 찾을 수 없습니다' };
    }

    return {
        title: `${bulletin.title} - 예인교회`,
        description: `${bulletin.date} 예인교회 주보입니다.`,
    };
}

export default async function BulletinDetailPage({ params }) {
    const { id } = await params;
    const bulletin = await getBulletinById(id);

    if (!bulletin) {
        notFound();
    }

    const isImage = bulletin.fileUrl && /\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(bulletin.fileUrl);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>주보</h1>
                    <p>예인교회의 매주 소식을 전해드립니다</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <article className={styles.article}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>{bulletin.title}</h1>
                            <div className={styles.meta}>
                                <span className={styles.date}>
                                    {bulletin.date && new Date(bulletin.date).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </header>

                        <div className={styles.content} style={{ textAlign: 'center' }}>
                            {bulletin.fileUrl ? (
                                isImage ? (
                                    <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                                        <img
                                            src={bulletin.fileUrl}
                                            alt={bulletin.title}
                                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ padding: '40px', background: '#f5f5f5', borderRadius: '8px' }}>
                                        <p style={{ marginBottom: '20px' }}>📄 {bulletin.fileName}</p>
                                        <a
                                            href={bulletin.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.backLink}
                                            style={{ background: 'var(--primary)', color: 'white' }}
                                        >
                                            파일 열기 / 다운로드
                                        </a>
                                    </div>
                                )
                            ) : (
                                <p>파일이 등록되지 않았습니다.</p>
                            )}
                        </div>

                        <footer className={styles.footer}>
                            <Link href="/faith/bulletin" className={styles.backLink}>
                                ← 목록으로 돌아가기
                            </Link>
                        </footer>
                    </article>
                </div>
            </section>
        </>
    );
}
