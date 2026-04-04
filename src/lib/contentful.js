import { createClient } from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    // Next.js fetch 캐시를 우회하여 항상 최신 데이터를 가져오도록 설정
    fetch: (url, options) => fetch(url, { ...options, next: { revalidate: 0 } }),
});

// 설교 목록 가져오기
export async function getSermons() {
    try {
        const response = await client.getEntries({
            content_type: 'sermon',
            order: ['-fields.date'],
        });
        return response.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            youtubeUrl: item.fields.youtubeUrl,
            preacher: item.fields.preacher,
            date: item.fields.date,
        }));
    } catch (error) {
        console.error('Error fetching sermons:', error);
        return [];
    }
}

// 칼럼 목록 가져오기 (페이징 지원)
export async function getColumns(page = 1, limit = 15) {
    try {
        const response = await client.getEntries({
            content_type: 'column',
            order: ['-fields.date'],
            limit: limit,
            skip: (page - 1) * limit,
        });
        return {
            items: response.items.map((item) => ({
                id: item.sys.id,
                title: item.fields.title,
                content: item.fields.content,
                author: item.fields.author,
                date: item.fields.date,
            })),
            total: response.total,
        };
    } catch (error) {
        console.error('Error fetching columns:', error);
        return { items: [], total: 0 };
    }
}

// 개별 칼럼 가져오기
export async function getColumnById(id) {
    try {
        const entry = await client.getEntry(id);
        return {
            id: entry.sys.id,
            title: entry.fields.title,
            content: entry.fields.content,
            author: entry.fields.author,
            date: entry.fields.date,
        };
    } catch (error) {
        console.error(`Error fetching column ${id}:`, error);
        return null;
    }
}

// 새벽묵상 목록 가져오기 (페이징 지원)
export async function getMeditations(page = 1, limit = 9) {
    try {
        const response = await client.getEntries({
            content_type: 'qt',
            order: ['-fields.date'],
            limit: limit,
            skip: (page - 1) * limit,
        });
        return {
            items: response.items.map((item) => ({
                id: String(item.sys.id),
                title: String(item.fields.title || '제목 없음'),
                content: item.fields.content,
                author: typeof item.fields.author === 'string' ? item.fields.author : (item.fields.author?.fields?.name || item.fields.author2 || '예인교회'),
                date: String(item.fields.date || ''),
            })),
            total: response.total,
        };
    } catch (error) {
        console.error('Error fetching meditations:', error);
        return { items: [], total: 0 };
    }
}

// 개별 새벽묵상 가져오기
export async function getMeditationById(id) {
    try {
        const entry = await client.getEntry(id);
        return {
            id: String(entry.sys.id),
            title: String(entry.fields.title || '제목 없음'),
            content: entry.fields.content,
            author: typeof entry.fields.author === 'string' ? entry.fields.author : (entry.fields.author?.fields?.name || entry.fields.author2 || '예인교회'),
            date: String(entry.fields.date || ''),
        };
    } catch (error) {
        console.error(`Error fetching meditation ${id}:`, error);
        return null;
    }
}

// 주보 목록 가져오기 (페이징 지원)
export async function getBulletins(page = 1, limit = 15) {
    try {
        const response = await client.getEntries({
            content_type: 'bulletin',
            order: ['-fields.date'],
            limit: limit,
            skip: (page - 1) * limit,
        });
        return {
            items: response.items.map((item) => ({
                id: item.sys.id,
                title: item.fields.title,
                date: item.fields.date,
                fileUrl: item.fields.file?.fields?.file?.url ? `https:${item.fields.file.fields.file.url}` : null,
            })),
            total: response.total,
        };
    } catch (error) {
        console.error('Error fetching bulletins:', error);
        return { items: [], total: 0 };
    }
}

// 개별 주보 가져오기
export async function getBulletinById(id) {
    try {
        const entry = await client.getEntry(id);
        return {
            id: entry.sys.id,
            title: entry.fields.title,
            date: entry.fields.date,
            fileUrl: entry.fields.file?.fields?.file?.url ? `https:${entry.fields.file.fields.file.url}` : null,
            fileName: entry.fields.file?.fields?.file?.fileName || 'bulletin',
        };
    } catch (error) {
        console.error(`Error fetching bulletin ${id}:`, error);
        return null;
    }
}

// 갤러리 목록 가져오기
export async function getGalleryItems() {
    try {
        const response = await client.getEntries({
            content_type: 'churchGallery',
            order: ['-fields.date'],
        });

        // Mock Data providing fallback
        if (!response.items || response.items.length === 0) {
            return [
                {
                    id: '1',
                    title: '2026 부활절 예배',
                    thumbnail: '/main-banner-high-1.png',
                    images: ['/main-banner-high-1.png'],
                    description: '기쁨과 감사의 부활절 예배 현장입니다.',
                    date: '2026-04-12',
                },
                {
                    id: '2',
                    title: '성가대 특별 찬양',
                    thumbnail: '/choir_performance_1770166449704.png',
                    images: ['/choir_performance_1770166449704.png'],
                    description: '은혜로운 성가대의 찬양입니다.',
                    date: '2026-03-20',
                },
                {
                    id: '3',
                    title: '여름 수련회',
                    thumbnail: '/main-banner-2.png',
                    images: ['/main-banner-2.png'],
                    description: '자연 속에서 하나님을 만나는 시간',
                    date: '2025-08-15',
                },
                {
                    id: '4',
                    title: '성탄 발표회',
                    thumbnail: '/church-banner.png',
                    images: ['/church-banner.png'],
                    description: '아기 예수님의 탄생을 축하하며',
                    date: '2025-12-25',
                },
                {
                    id: '5',
                    title: '새가족 환영회',
                    thumbnail: '/main-banner-welcome.png',
                    images: ['/main-banner-welcome.png'],
                    description: '새로운 가족이 되신 여러분 환영합니다',
                    date: '2026-01-10',
                },
                {
                    id: '6',
                    title: '담임목사님 설교',
                    thumbnail: '/pastor-photo.png',
                    images: ['/pastor-photo.png'],
                    description: '매주 선포되는 생명의 말씀',
                    date: '2026-02-01',
                },
            ];
        }

        return response.items.map((item) => {
            // contentful에서 이미지가 하나('image')일 수도 있고, 여러 개('images')일 수도 있음
            // 사용자가 'images'라는 알기 쉬운 이름으로 만들었지만 'One file'로 잘못 만들었을 경우도 대비
            let imageUrls = [];

            if (item.fields.images) {
                if (Array.isArray(item.fields.images)) {
                    // 다중 이미지 (Many files) 설정인 경우
                    imageUrls = item.fields.images.map(img =>
                        img.fields?.file?.url ? `https:${img.fields.file.url}` : null
                    ).filter(Boolean);
                } else {
                    // 단일 이미지 (One file) 설정이지만 이름이 images인 경우
                    const url = item.fields.images.fields?.file?.url ? `https:${item.fields.images.fields.file.url}` : null;
                    if (url) imageUrls = [url];
                }
            }

            // 2. 'image' 필드 확인 (images에서 못 찾았거나 추가로 있는 경우)
            if (item.fields.image) {
                if (Array.isArray(item.fields.image)) {
                    // image 필드인데 배열인 경우 (Many files 설정) 
                    // 사용자가 'image'라고 이름 짓고 'List' 타입을 선택한 경우입니다.
                    imageUrls.push(...item.fields.image.map(img =>
                        img.fields?.file?.url ? `https:${img.fields.file.url}` : null
                    ).filter(Boolean));
                } else if (item.fields.image.fields?.file?.url) {
                    // image 필드이고 단일 객체인 경우 (One file 설정)
                    imageUrls.push(`https:${item.fields.image.fields.file.url}`);
                }
            }

            return {
                id: item.sys.id,
                title: item.fields.title,
                thumbnail: imageUrls.length > 0 ? imageUrls[0] : null,
                images: imageUrls,
                description: item.fields.description,
                date: item.fields.date,
            };
        });
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        // Return mock data on error as fallback
        return [
            {
                id: '1',
                title: '2026 부활절 예배',
                thumbnail: '/main-banner-high-1.png',
                images: ['/main-banner-high-1.png'],
                description: '기쁨과 감사의 부활절 예배 현장입니다.',
                date: '2026-04-12',
            },
            {
                id: '2',
                title: '성가대 특별 찬양',
                thumbnail: '/choir_performance_1770166449704.png',
                images: ['/choir_performance_1770166449704.png'],
                description: '은혜로운 성가대의 찬양입니다.',
                date: '2026-03-20',
            },
        ];
    }
}

// 활성화된 팝업 가져오기
export async function getActivePopup() {
    try {
        const response = await client.getEntries({
            content_type: 'popup',
            'fields.isActive': true, // 활성화된 것만 쿼리 단계에서 필터링
            order: ['-sys.updatedAt'], // 가장 최근에 수정한 순서대로
            limit: 1,
        });

        if (response.items.length === 0) return null;
        
        const item = response.items[0];
        return {
            id: item.sys.id,
            title: item.fields.title,
            image: item.fields.image?.fields?.file?.url ? `https:${item.fields.image.fields.file.url}` : null,
            link: item.fields.link || null,
        };
    } catch (error) {
        console.error('Error fetching popup:', error);
        return null;
    }
}

// 성가대 찬양 가져오기
export async function getChoirPraises() {
    try {
        const response = await client.getEntries({
            content_type: 'choir',
            order: ['-fields.date'],
        });
        return response.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            youtubeUrl: item.fields.youtubeUrl,
            date: item.fields.date,
        }));
    } catch (error) {
        console.error('Error fetching choir praises:', error);
        return [];
    }
}

// 찬양팀 영상 가져오기
export async function getPraisePraises() {
    try {
        const response = await client.getEntries({
            content_type: 'praise',
            order: ['-fields.date'],
        });
        return response.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            youtubeUrl: item.fields.youtubeUrl,
            date: item.fields.date,
        }));
    } catch (error) {
        console.error('Error fetching praise praises:', error);
        return [];
    }
}

// 공지사항 목록 가져오기 (페이징 지원)
export async function getNotices(page = 1, limit = 15) {
    try {
        const response = await client.getEntries({
            content_type: 'notice',
            order: ['-fields.date'],
            limit: limit,
            skip: (page - 1) * limit,
        });

        // Mock data if no entries found
        if (response.items.length === 0) {
            return {
                items: [
                    {
                        id: 'mock-1',
                        title: '구리 예인교회 홈페이지 새 단장 안내',
                        content: '성도 여러분의 신앙생활에 도움을 드리고자 홈페이지를 새롭게 단장하였습니다. 많은 이용 바랍니다.',
                        author: '관리자',
                        date: '2026-03-01',
                    },
                    {
                        id: 'mock-2',
                        title: '금주 예배 안내',
                        content: '이번 주 주일 예배는 평소와 동일하게 진행됩니다. 기도로 준비해 주시기 바랍니다.',
                        author: '예인교회',
                        date: '2026-04-05',
                    }
                ],
                total: 2,
            }
        }

        return {
            items: response.items.map((item) => ({
                id: item.sys.id,
                title: item.fields.title,
                content: item.fields.content,
                image: item.fields.image?.fields?.file?.url ? `https:${item.fields.image.fields.file.url}` : null,
                author: item.fields.author || '예인교회',
                date: item.fields.date,
            })),
            total: response.total,
        };
    } catch (error) {
        console.error('Error fetching notices:', error);
        return { 
            items: [
                {
                    id: 'mock-1',
                    title: '구리 예인교회 홈페이지 새 단장 안내',
                    content: '성도 여러분의 신앙생활에 도움을 드리고자 홈페이지를 새롭게 단장하였습니다. 많은 이용 바랍니다.',
                    author: '관리자',
                    date: '2026-03-01',
                }
            ], 
            total: 1 
        };
    }
}

// 개별 공지사항 가져오기
export async function getNoticeById(id) {
    try {
        // Handle mock IDs
        if (id.startsWith('mock-')) {
            const mockNotices = [
                {
                    id: 'mock-1',
                    title: '구리 예인교회 홈페이지 새 단장 안내',
                    content: '성도 여러분의 신앙생활에 도움을 드리고자 홈페이지를 새롭게 단장하였습니다. 많은 이용 바랍니다.',
                    author: '관리자',
                    date: '2026-03-01',
                },
                {
                    id: 'mock-2',
                    title: '금주 예배 안내',
                    content: '이번 주 주일 예배는 평소와 동일하게 진행됩니다. 기도로 준비해 주시기 바랍니다.',
                    author: '예인교회',
                    date: '2026-04-05',
                }
            ];
            return mockNotices.find(n => n.id === id) || null;
        }

        const entry = await client.getEntry(id);
        return {
            id: entry.sys.id,
            title: entry.fields.title,
            content: entry.fields.content,
            image: entry.fields.image?.fields?.file?.url ? `https:${entry.fields.image.fields.file.url}` : null,
            author: entry.fields.author || '예인교회',
            date: entry.fields.date,
        };
    } catch (error) {
        console.error(`Error fetching notice ${id}:`, error);
        return null;
    }
}

export default client;
