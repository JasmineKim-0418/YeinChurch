import { getSermons } from '@/lib/contentful';
import SermonsClient from './SermonsClient';

// 60초마다 새 데이터 확인
export const revalidate = 60;

export const metadata = {
    title: '설교 - 구리 예인교회',
    description: '구리 예인교회 주일설교를 영상으로 만나보세요.',
};

export default async function SermonsPage() {
    const sermons = await getSermons();

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>설교</h1>
                    <p>말씀을 통해 하나님을 만나세요</p>
                </div>
            </div>
            <SermonsClient initialSermons={sermons} />
        </>
    );
}
