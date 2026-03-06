import { getBulletins } from '@/lib/contentful';
import styles from './bulletin.module.css';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
    title: '주보 - 예인교회',
    description: '예인교회의 매주 주보를 확인하실 수 있습니다.',
};

const ITEMS_PER_PAGE = 5;

export default async function BulletinPage({ searchParams }) {
    const params = await searchParams;
    const currentPage = parseInt(params?.page || '1', 10);
    const { items: bulletins, total } = await getBulletins(currentPage, ITEMS_PER_PAGE);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    // Calculate item numbers (descending)
    const getItemNumber = (index) => total - ((currentPage - 1) * ITEMS_PER_PAGE + index);

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
                    {bulletins.length === 0 ? (
                        <div className={styles.empty}>
                            <p>등록된 주보가 없습니다.</p>
                            <p className={styles.hint}>Contentful에서 주보를 추가해주세요.</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.bulletinList}>
                                {/* Header */}
                                <div className={styles.listHeader}>
                                    <span>번호</span>
                                    <span>제목</span>
                                    <span>상태</span>
                                    <span style={{ textAlign: 'right' }}>날짜</span>
                                </div>

                                {/* Items */}
                                {bulletins.map((bulletin, index) => (
                                    <Link
                                        href={`/faith/bulletin/${bulletin.id}`}
                                        key={bulletin.id}
                                        className={styles.listItem}
                                    >
                                        <span className={styles.itemNumber}>{getItemNumber(index)}</span>
                                        <span className={styles.itemTitle}>{bulletin.title}</span>
                                        <div className={styles.itemMeta}>
                                            <span className={styles.itemAuthor}>
                                                {bulletin.fileUrl ? '📄 파일 있음' : '❌ 파일 없음'}
                                            </span>
                                            <span className={styles.itemDate}>
                                                {bulletin.date && new Date(bulletin.date).toLocaleDateString('ko-KR')}
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
                                        href={currentPage > 1 ? `/faith/bulletin?page=${currentPage - 1}` : '#'}
                                        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                                    >
                                        ← 이전
                                    </Link>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <Link
                                            key={pageNum}
                                            href={`/faith/bulletin?page=${pageNum}`}
                                            className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                                        >
                                            {pageNum}
                                        </Link>
                                    ))}

                                    {/* Next Button */}
                                    <Link
                                        href={currentPage < totalPages ? `/faith/bulletin?page=${currentPage + 1}` : '#'}
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
