import styles from './history.module.css';

export const metadata = {
    title: '연혁 - 예인교회',
    description: '예인교회의 역사와 주요 연혁을 소개합니다.',
};

const historyData = [
    {
        year: '2024',
        events: ['03.04. 구리시 지적재조사 결과로 교회부지 30평 증가 조정금 분할 납부하기로 하다.']
    },
    {
        year: '2022',
        events: ['07.10. 김왕기, 이우영, 이장영 집사가 안수집사로 피택되다.']
    },
    {
        year: '2019',
        events: [
            '10.14. 예인교회가 예장 합동 평양노회에 가입하다.',
            '09.29. 공회의회를 통해 독립교단 탈퇴를 가결하다.',
            '04.15. 교회 리모델링 공사를 시작하다.',
            '01.06. 전교인 세대통합예배를 시작하다. 오후예배를 30분 당겨 2시에 드리다.'
        ]
    },
    {
        year: '2018',
        events: ['10.27. 최봉식, 백세명, 최연태, 엄홍윤, 박영길을 안수집사로 임직받다. 임금희, 원유숙, 문순주, 최은희, 홍은기를 권사로 임직받다.']
    },
    {
        year: '2017',
        events: ['07.02. 사랑의장기기증서약 행사를 갖다.']
    },
    {
        year: '2012',
        events: ['04.30. 길무궁 원로목사 소천하다.(5월2일 양평군 양서면 도곡리 선산에 장례)']
    },
    {
        year: '2010',
        events: ['10.17. 길무궁 목사 은퇴, 김순원 목사 담임목사로 부임하다.']
    },
    {
        year: '2008',
        events: [
            '02.17. ‘예인사랑의 집’을 인창동으로 이사하다.',
            '02.15. 예인꿈나라 공부방(현, 예인지역아동센터)을 개원하다.'
        ]
    },
    {
        year: '2007',
        events: ['12.30. 구리시 인창동 소재 나눔과 기쁨의 교회(허종칠 목사)와 합병하기로 가결하다.']
    },
    {
        year: '2006',
        events: ['12.10. 예인교회 예장백석 평남노회 가입을 위한 공동의회에서 만장일치로 결의하다.']
    },
    {
        year: '2003',
        events: ['06.06. 예인교회 고파도수양관 개원예배 드리다.']
    },
    {
        year: '2002',
        events: ['10. 길무궁 전도사 개인소유 ‘구리시 교문동 233-52’ 건물을 교회로 이전하다.']
    },
    {
        year: '2000',
        events: ['05.05. 구리시 교문동 236 대영빌딩 2층 신망애 한의원 직원 5명과 설립예배 드리다.']
    },
];

export default function HistoryPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>연혁</h1>
                    <p>예인교회가 걸어온 길</p>
                </div>
            </div>

            <section className={`section ${styles.history}`}>
                <div className="container">
                    <div className={styles.timeline}>
                        {historyData.map((item, index) => (
                            <div key={index} className={styles.timelineItem}>
                                <div className={styles.year}>{item.year}</div>
                                <div className={styles.dot}></div>
                                <div className={styles.content}>
                                    <ul>
                                        {item.events.map((event, eventIndex) => (
                                            <li key={eventIndex}>{event}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
