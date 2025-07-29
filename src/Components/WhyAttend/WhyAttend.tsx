import Title from '../Title/Title';

import Reasons from './Reasons/Reasons';
import styles from './WhyAttend.module.scss';

const WhyAttend = () => (
  <section className={styles.whyAttend}>
    <Title
      title="WHY ATTEND?"
      description="Discover why Next-Gen AI Summit is the must-attend event for AI professionals, innovators, and industry leaders."
    />
    <Reasons />
  </section>
);

export default WhyAttend;
