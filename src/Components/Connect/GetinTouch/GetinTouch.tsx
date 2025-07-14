import Button from "../../Button/Button"
import styles from "./GetinTouch.module.scss"

const GetinTouch = () => (
  
  <div className={styles.GetinTouch}>
    <div className={styles.GetinTouchContent}>
      <h1 className={styles.GetinTouchTitle}>get in touch</h1>
      <p className={styles.GetinTouchDescription}>Reach out with inquiries about tickets, partnerships, or event details.</p>
      <input type="text" placeholder="Name" className={styles.Input} />
      <input type="text" placeholder="Email" className={styles.Input} />
      <input type="text" placeholder="Subject" className={styles.Input} />
      <input type="text" placeholder="message" className={styles.Input} />
      <Button text="Send message" top="0" left="0" width="440px" />
    </div>
  </div>
)
export default GetinTouch