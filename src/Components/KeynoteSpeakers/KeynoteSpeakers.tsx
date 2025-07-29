import Title from '../Title/Title';

import upRightArrow from './../../assets/upRightArrow.svg';
import styles from './KeynoteSpeakers.module.scss';
import SpeakersList from './SpeakersList/SpeakersList';

const KeynoteSpeakers = () => (
  <section className={styles.KeynoteSpeakersMain}>
    <Title
      title="KEYNOTE SPEAKERS"
      description="Meet the industry leaders shaping the future of AI."
    />
    <SpeakersList />
    <button className={styles.moreButton} aria-label="See more keynote speakers">
      And more
      <img src={upRightArrow} alt="upRightArrow" className={styles.icon} />
    </button>
  </section>
);
export default KeynoteSpeakers;
