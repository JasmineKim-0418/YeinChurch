import styles from './worship.module.css';

export const metadata = {
    title: '예배안내 - 예인교회',
    description: '예인교회 예배 시간 및 안내입니다.',
};

const worshipSchedule = [
    {
        name: '주일 예배',
        time: '1부: 오전 7:30\n2부: 오전 11:00',
        location: '본당',
        description: '온 가족이 함께 드리는 주일 예배',
        icon: '/icon-church2.png',
        isImage: true,
    },
    {
        name: '수요 예배',
        time: '오후 7:30',
        location: '본당',
        description: '말씀 중심의 은혜로운 예배',
        icon: '/bible.png',
        isImage: true,
    },
    {
        name: '금요 기도회',
        time: '오후 9:00',
        location: '본당',
        description: '기도로 하나되는 시간',
        icon: '/icon-prayer.png',
        isImage: true,
    },
    {
        name: '새벽 기도',
        time: '월~금 오전 5:00',
        location: '본당',
        description: '하루를 여는 기도의 시간',
        icon: '/sunrise.png',
        isImage: true,
    },
];

const departments = [
    {
        name: '주일학교\n(유치부 · 초등부)',
        age: '유치부 5-7세\n초등부 8~13세',
        time: '주일 오전 9:40',
        location: '아동부실'
    },
    {
        name: '중 · 고등부\n(공과공부)',
        age: '중 · 고등학생',
        time: '주일 오후 1:00',
        location: '아동부실'
    },
    {
        name: '청년부\n(제자훈련)',
        age: '대학생/청년',
        time: '토요일 오후 4:00',
        location: '본당/청년부실'
    },
];

export default function WorshipPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>예배안내</h1>
                    <p>함께 드리는 예배, 하나님을 만나는 시간</p>
                </div>
            </div>

            {/* 주요 예배 */}
            <section className={`section ${styles.mainWorship}`}>
                <div className="container">
                    <h2 className="section-title">주요 예배</h2>
                    <div className={styles.worshipGrid}>
                        {worshipSchedule.map((worship, index) => (
                            <div key={index} className={styles.worshipCard}>
                                <div className={styles.worshipIcon}>
                                    {worship.isImage ? (
                                        <img
                                            src={worship.icon}
                                            alt={worship.name}
                                            className={styles.iconImg}
                                        />
                                    ) : (
                                        worship.icon
                                    )}
                                </div>
                                <h3>{worship.name}</h3>
                                <p className={styles.worshipTime}>{worship.time}</p>
                                <p className={styles.worshipLocation}>📍 {worship.location}</p>
                                <p className={styles.worshipDesc}>{worship.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 부서별 예배 */}
            <section className={`section ${styles.departments}`}>
                <div className="container">
                    <h2 className="section-title">부서별 예배</h2>
                    <div className={styles.deptTable}>
                        <div className={styles.tableHeader}>
                            <span>부서</span>
                            <span>대상</span>
                            <span>시간</span>
                            <span>장소</span>
                        </div>
                        {departments.map((dept, index) => (
                            <div key={index} className={styles.tableRow}>
                                <span className={styles.deptName}>{dept.name}</span>
                                <span>{dept.age}</span>
                                <span>{dept.time}</span>
                                <span>{dept.location}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 안내 사항 */}
            <section className={`section ${styles.notice}`}>
                <div className="container">
                    <div className={styles.noticeBox}>
                        <h3>📢 예배 안내</h3>
                        <ul>
                            <li>예배 10분 전까지 입장해 주시면 감사하겠습니다.</li>
                            <li>예배 중 휴대폰은 진동 또는 무음으로 설정해 주세요.</li>
                            <li>주차 공간이 한정되어 있으니 대중교통 이용을 권장합니다.</li>
                            <li>처음 오시는 분은 안내석에서 도움을 받으실 수 있습니다.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
