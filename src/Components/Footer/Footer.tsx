import styles from './Footer.module.scss';
import FooterFirstBlock from './FooterFirstBlock/FooterFirstBlock';
import FooterSecondBlock from './FooterSecondBlock/FooterSecondBlock';

const Footer = () => (
  <footer className={styles.footerMain}>
    <div className={styles.footerContentWrapper}>
      <div className={styles.leftColumn}>
        <FooterFirstBlock />
      </div>
      <div className={styles.rightColumn}>
        <FooterSecondBlock />
      </div>
    </div>
  </footer>
);
export default Footer;
