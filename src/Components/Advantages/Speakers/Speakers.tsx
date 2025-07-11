import styles from "./Speakers.module.scss";
import upRightArrow from "../../../assets/upRightArrow.svg";
import ImagesCollection from "../ImagesColection/ImagesColection";

const Speakers= () => (

    <article className={styles.card}>
        <div className={styles.cardContent}>
            <h2 className={styles.title}>Speakers</h2>

            <div className={styles.description}>
                <div className={styles.iconCircle} role="presentation">
                    <img
                        src={upRightArrow}
                        alt="upRightArrow"
                        className={styles.icon}
                    />
                </div>
                <p className={styles.subtext}>
                    Hear from global AI leaders, researchers, and entrepreneurs<br />
                    who are defining the future of artificial intelligence.
                </p>
            </div>

            <div className={styles.footerRow}>
                <ImagesCollection />
                <button className={styles.moreButton}>
                    And more
                    <img
                        src={upRightArrow}
                        alt="upRightArrow"
                        className={styles.icon}
                    />
                </button>
            </div>
        </div>
    </article>
);

export default Speakers;