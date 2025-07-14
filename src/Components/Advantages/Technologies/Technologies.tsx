import styles from "./Technologies.module.scss";

const Technologies = () => (

    <article className={styles.card}>
        <div className={styles.cardContent}>
            <h2 className={styles.title}>Technologies</h2>
            <p className={styles.subtext}>
                Explore advanced machine learning, natural language<br />
                processing, AI-driven automation, and emerging cybersecurity<br />
                applications.
            </p>
        </div>
    </article>
);

export default Technologies;