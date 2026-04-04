import { getNotices } from '@/lib/contentful';
import styles from './notice.module.css';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
    title: '공지사항 - 예인교회',
    description: '구리 예인교회의 소식과 공지사항을 전해드립니다.',
};

const ITEMS_PER_PAGE = 7;

export default async function NoticePage({ searchParams }) {
    const params = await searchParams;
    const currentPage = parseInt(params?.page || '1', 10);
    const { items: notices, total } = await getNotices(currentPage, ITEMS_PER_PAGE);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    // 내림차순 번호 계산
    const getItemNumber = (index) => total - ((currentPage - 1) * ITEMS_PER_PAGE + index);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>공지사항</h1>
                    <p>교회 소식과 공지사항입니다</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {notices.length === 0 ? (
                        <div className={styles.empty}>
                            <p>등록된 공지사항이 없습니다.</p>
                            <p className={styles.hint}>Contentful에서 공지사항을 추가해주세요.</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.noticeList}>
                                {/* Header */}
                                <div className={styles.listHeader}>
                                    <span>번호</span>
                                    <span>제목</span>
                                    <span>작성자</span>
                                    <span style={{ textAlign: 'right' }}>날짜</span>
                                </div>

                                {/* Items */}
                                {notices.map((notice, index) => (
                                    <Link
                                        href={`/news/notice/${notice.id}`}
                                        key={notice.id}
                                        className={styles.listItem}
                                    >
                                        <span className={styles.itemNumber}>{getItemNumber(index)}</span>
                                        <span className={styles.itemTitle}>{notice.title}</span>
                                        <div className={styles.itemMeta}>
                                            <span className={styles.itemAuthor}>{notice.author}</span>
                                            <span className={styles.itemDate}>
                                                {notice.date && new Date(notice.date).toLocaleDateString('ko-KR')}
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
                                        href={currentPage > 1 ? `/news/notice?page=${currentPage - 1}` : '#'}
                                        aria-disabled={currentPage === 1}
                                        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                                    >
                                        ← 이전
                                    </Link>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <Link
                                            key={pageNum}
                                            href={`/news/notice?page=${pageNum}`}
                                            className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                                        >
                                            {pageNum}
                                        </Link>
                                    ))}

                                    {/* Next Button */}
                                    <Link
                                        href={currentPage < totalPages ? `/news/notice?page=${currentPage + 1}` : '#'}
                                        aria-disabled={currentPage === totalPages}
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
