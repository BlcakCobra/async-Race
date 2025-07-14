import styles from "./TitlePart.module.scss"

const TitlePart = () => (
  
  <div className={styles.TitlePart}>
    <h1 className={styles.title}>We’re here to connect and assist you</h1>
    <p className={styles.description}>Have questions about the summit? Need help with registration or travel? Our team is ready to assist you.</p>
    <div className={styles.ContactUs}>

      <div className={styles.Block}>
        <h2 className={styles.contactTitle}>Contact Us</h2>
        <h3 className={styles.contactDescription}>+31 20 123 4567</h3>
      </div>
      <div className={styles.Block}>
        <h2 className={styles.contactTitle}>Event Location </h2>
        <h3 className={styles.contactDescription}>Horizon Convention CenterAmsterdam, Netherlands</h3>
      </div>
      <div className={styles.Block}>
        <h2 className={styles.contactTitle}>email</h2>
        <h3 className={styles.contactDescription}>info@nexus.com</h3>
      </div>
      <div className={styles.Block}>
        <h2 className={styles.contactTitle}>Follow Us</h2>
        <div className={styles.logoBox}>
          <div className={styles.logo} />
          <div className={styles.logo} />
          <div className={styles.logo} />
          <div className={styles.logo} />
        </div>
      </div>

    </div>
  </div>
)
export default TitlePart