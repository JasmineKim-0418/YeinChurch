import styles from './departments.module.css';
import Link from 'next/link';

export default function DepartmentsPage() {
    const departments = [
        { title: '주일학교', path: '/departments/sunday-school', desc: '새싹들과 함께하는 예배' },
        { title: '중·고등부', path: '/departments/youth', desc: '비전을 품는 청소년 예배' },
        { title: '청년부', path: '/departments/young-adults', desc: '세상의 빛이 되는 청년 예배' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>부서 안내</h1>
                <p className={styles.subtitle}>예인교회의 다음 세대를 위한 공동체입니다.</p>
            </div>

            <div className={styles.grid}>
                {departments.map((dept, index) => (
                    <Link href={dept.path} key={index} className={styles.card}>
                        <h2 className={styles.cardTitle}>{dept.title}</h2>
                        <p className={dept.cardDesc}>{dept.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
