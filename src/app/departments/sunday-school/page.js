import styles from '../departments.module.css';

export default function SundaySchoolPage() {
    return (
        <div className={styles.container}>
            <div className={styles.imageOnlyContent}>
                <picture>
                    <source media="(max-width: 768px)" srcSet="/child_mobile2.png" />
                    <img
                        src="/child_desk2.png"
                        alt="주일학교"
                        className={styles.fullImage}
                    />
                </picture>
            </div>
        </div>
    );
}
