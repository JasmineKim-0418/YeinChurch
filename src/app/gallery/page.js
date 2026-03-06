import { getGalleryItems } from '@/lib/contentful';
import GalleryClient from './GalleryClient';

// 60초마다 새 데이터 확인 (Contentful 연동)
export const revalidate = 60;

export const metadata = {
    title: '갤러리 - 예인교회',
    description: '예인교회의 다양한 활동 사진을 만나보세요.',
};

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>교회 갤러리</h1>
                    <p>하나님의 은혜가 머무는 예인교회의 소중한 순간들입니다</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <GalleryClient items={items} />
                </div>
            </section>
        </>
    );
}
