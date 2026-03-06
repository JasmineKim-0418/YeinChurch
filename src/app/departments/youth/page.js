import styles from '../departments.module.css';

export default function YouthPage() {
    return (
        <div className={styles.container}>
            <div className={styles.imageOnlyContent}>
                <picture>
                    <source media="(max-width: 768px)" srcSet="/child_mobile2.png" />
                    <img
                        src="/child_desk2.png"
                        alt="중고등부"
                        className={styles.fullImage}
                    />
                </picture>
            </div>
        </div>
    );
}
