import styles from '../departments.module.css';

export default function YoungAdultsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.imageOnlyContent}>
                <picture>
                    <source media="(max-width: 768px)" srcSet="/young_adult_mobile2.png" />
                    <img
                        src="/young_adult_desk2.png"
                        alt="청년부"
                        className={styles.fullImage}
                    />
                </picture>
            </div>
        </div>
    );
}
