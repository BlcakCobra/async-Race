import styles from "./FirstBlock.module.scss";
import upRightArrow from "../../assets/upRightArrow.svg";
import bluePattern from "../../assets/2446f29a-72f7-4eef-ae50-edb836b3dcee.png";

const FirstBlock = () => (

    <section className={styles.firstBlock}>
        <div className={styles.backgroundPattern}>
            <img
                src={bluePattern}
                alt="Decorative blue pattern"
                className={styles.backgroundImage}
            />
        </div>

        <div className={styles.infoRow}>
            <h2 className={styles.infoText}>OCTOBER 15–17, 2052</h2>
            <h2 className={styles.infoText}>
                Horizon Convention Center, TechCity, Utopolis
            </h2>
        </div>

        <div className={styles.titleBlock}>
            <h1 className={styles.title}>NEXT-GEN AI<br />SUMMIT</h1>
        </div>

        <div className={styles.description}>
            <p className={styles.descriptionText}>
                Explore the cutting-edge innovations shaping the future of artificial intelligence.
                <br />
                Join global leaders and visionaries for two days of insights, discussions, and breakthroughs.
            </p>
        </div>

        <div className={styles.button}>
            Early bird tickets
            <img
                src={upRightArrow}
                alt="Arrow icon"
                className={styles.arrowIcon}
            />
        </div>
    </section>
);

export default FirstBlock;
