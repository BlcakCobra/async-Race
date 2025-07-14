import styles from "./FooterSecondBlock.module.scss"

const FooterSecondBlock = () => (

    <div className={styles.Second}>
        <div className={styles.Content}>
            <h1 className={styles.title}>Stay updated</h1>
            <p className={styles.description}>Subscribe for event updates & exclusive content.</p>
            <input type="text" className={styles.Input} placeholder="Email" />
            <div className={styles.Block}>
                <h2 className={styles.contactTitle}>Follow Us</h2>
                <div className={styles.logoBox}>
                    <div className={styles.logo} />
                    <div className={styles.logo} />
                    <div className={styles.logo} />
                    <div className={styles.logo} />
                </div>
                <div
                    className={styles.button}
                >
                    Stay updated
                </div>
            </div>
        </div>
    </div>
)
export default FooterSecondBlock