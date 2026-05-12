import { getGalleryItemById } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '../gallery.module.css';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const p = await params;
    const item = await getGalleryItemById(p.id);
    if (!item) {
        return {
            title: '사진을 찾을 수 없습니다 - 예인교회',
        };
    }
    return {
        title: `${item.title} - 예인교회 갤러리`,
        description: item.description || '예인교회의 다양한 활동 사진을 만나보세요.',
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false,
                noimageindex: true,
            },
        },
    };
}

export default async function GalleryDetailPage({ params }) {
    const p = await params;
    const item = await getGalleryItemById(p.id);

    if (!item) {
        notFound();
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>교회 갤러리</h1>
                    <p>하나님의 은혜가 머무는 예인교회의 소중한 순간들입니다</p>
                </div>
            </div>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <header style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px', wordBreak: 'keep-all' }}>{item.title}</h1>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <span>
                                    📅 {item.date && new Date(item.date).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </header>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div className={styles.imageFeed}>
                                {item.images && item.images.length > 0 ? (
                                    item.images.map((img, idx) => (
                                        <div key={idx} className={styles.feedImageBox}>
                                            <img
                                                src={img}
                                                alt={`${item.title} - ${idx + 1}`}
                                                className={styles.fullImage}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.feedImageBox}>
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className={styles.fullImage}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className={styles.contentArea}>
                                <p className={styles.fullDescription} style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <footer style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px dashed var(--border-color)', textAlign: 'center' }}>
                            <Link href="/gallery">
                                <button className={styles.backBtn}>목록으로</button>
                            </Link>
                        </footer>
                    </div>
                </div>
            </section>
        </>
    );
}
