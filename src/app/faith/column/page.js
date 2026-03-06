import { getColumns } from '@/lib/contentful';
import styles from './column.module.css';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
    title: '칼럼 - 예인교회',
    description: '신앙 성장을 위한 칼럼을 읽어보세요.',
};

const ITEMS_PER_PAGE = 5;

export default async function ColumnPage({ searchParams }) {
    const params = await searchParams;
    const currentPage = parseInt(params?.page || '1', 10);
    const { items: columns, total } = await getColumns(currentPage, ITEMS_PER_PAGE);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    // Calculate item numbers (descending)
    const getItemNumber = (index) => total - ((currentPage - 1) * ITEMS_PER_PAGE + index);

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
                    {columns.length === 0 ? (
                        <div className={styles.empty}>
                            <p>등록된 칼럼이 없습니다.</p>
                            <p className={styles.hint}>Contentful에서 칼럼을 추가해주세요.</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.columnList}>
                                {/* Header */}
                                <div className={styles.listHeader}>
                                    <span>번호</span>
                                    <span>제목</span>
                                    <span>작성자</span>
                                    <span style={{ textAlign: 'right' }}>날짜</span>
                                </div>

                                {/* Items */}
                                {columns.map((column, index) => (
                                    <Link
                                        href={`/faith/column/${column.id}`}
                                        key={column.id}
                                        className={styles.listItem}
                                    >
                                        <span className={styles.itemNumber}>{getItemNumber(index)}</span>
                                        <span className={styles.itemTitle}>{column.title}</span>
                                        <div className={styles.itemMeta}>
                                            <span className={styles.itemAuthor}>{column.author}</span>
                                            <span className={styles.itemDate}>
                                                {column.date && new Date(column.date).toLocaleDateString('ko-KR')}
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
                                        href={currentPage > 1 ? `/faith/column?page=${currentPage - 1}` : '#'}
                                        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                                    >
                                        ← 이전
                                    </Link>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <Link
                                            key={pageNum}
                                            href={`/faith/column?page=${pageNum}`}
                                            className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                                        >
                                            {pageNum}
                                        </Link>
                                    ))}

                                    {/* Next Button */}
                                    <Link
                                        href={currentPage < totalPages ? `/faith/column?page=${currentPage + 1}` : '#'}
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
