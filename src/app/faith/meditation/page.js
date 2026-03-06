import { getMeditations } from '@/lib/contentful';
import styles from './meditation.module.css';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
    title: '새벽묵상 - 예인교회',
    description: '매일 아침 하나님의 말씀과 함께하는 새벽묵상입니다.',
};

const ITEMS_PER_PAGE = 5;

export default async function MeditationPage({ searchParams }) {
    const params = await searchParams;
    const currentPage = parseInt(params?.page || '1', 10);
    const { items: meditations, total } = await getMeditations(currentPage, ITEMS_PER_PAGE);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    // Calculate item numbers (descending)
    const getItemNumber = (index) => total - ((currentPage - 1) * ITEMS_PER_PAGE + index);

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
                    {meditations.length === 0 ? (
                        <div className={styles.empty}>
                            <p>등록된 묵상이 없습니다.</p>
                            <p className={styles.hint}>Contentful에서 새벽묵상을 추가해주세요.</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.meditationList}>
                                {/* Header */}
                                <div className={styles.listHeader}>
                                    <span>번호</span>
                                    <span>제목</span>
                                    <span>작성자</span>
                                    <span style={{ textAlign: 'right' }}>날짜</span>
                                </div>

                                {/* Items */}
                                {meditations.map((meditation, index) => (
                                    <Link
                                        href={`/faith/meditation/${meditation.id}`}
                                        key={meditation.id}
                                        className={styles.listItem}
                                    >
                                        <span className={styles.itemNumber}>{getItemNumber(index)}</span>
                                        <span className={styles.itemTitle}>{meditation.title}</span>
                                        <div className={styles.itemMeta}>
                                            <span className={styles.itemAuthor}>{meditation.author}</span>
                                            <span className={styles.itemDate}>
                                                {meditation.date && new Date(meditation.date).toLocaleDateString('ko-KR')}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    {/* Previous Button */}
                                    <Link
                                        href={currentPage > 1 ? `/faith/meditation?page=${currentPage - 1}` : '#'}
                                        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                                    >
                                        ← 이전
                                    </Link>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <Link
                                            key={pageNum}
                                            href={`/faith/meditation?page=${pageNum}`}
                                            className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                                        >
                                            {pageNum}
                                        </Link>
                                    ))}

                                    {/* Next Button */}
                                    <Link
                                        href={currentPage < totalPages ? `/faith/meditation?page=${currentPage + 1}` : '#'}
                                        className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                                    >
                                        다음 →
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
