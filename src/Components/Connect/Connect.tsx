import map from './../../assets/f2e3de515b54caf0f18318cf6a5cc5c6382ca636.jpg';
import styles from './Connect.module.scss';
import GetinTouch from './GetinTouch/GetinTouch';
import TitlePart from './TitlePart/TitlePart';

const Connect = () => (
  <section className={styles.Connect}>
    <div className={styles.ConnectBox}>
      <div className={styles.FirstTwoBlocks}>
        <TitlePart />
        <GetinTouch />
      </div>
      <div className={styles.Map} style={{ backgroundImage: `url(${map})` }} />
    </div>
  </section>
);
export default Connect;
