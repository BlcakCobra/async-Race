import styles from './Advantages.module.scss';
import NetworkingOpportunities from './NetworkingOpportunities/NetworkingOpportunities';
import Speakers from './Speakers/Speakers';
import Technologies from './Technologies/Technologies';

const Advantages = () => (
  <section className={styles.advantages}>
    <Speakers />
    <div className={styles.rightColumn}>
      <Technologies />
      <NetworkingOpportunities />
    </div>
  </section>
);

export default Advantages;
