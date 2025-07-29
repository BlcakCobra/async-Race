import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useCallback, useEffect, useState } from 'react';

import Title from '../Title/Title';

import pattern from './../../assets/2446f29a-72f7-4eef-ae50-edb836b3dcee.png';
import styles from './RegisterNow.module.scss';

dayjs.extend(duration);

export default function RegisterNow() {
  const earlyBirdEnd = dayjs('2025-08-01T23:59:59');

  const calculateTimeLeft = useCallback(() => {
    const now = dayjs();
    const diff = earlyBirdEnd.diff(now);

    if (diff <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
    }

    const dur = dayjs.duration(diff);

    return {
      days: dur.days().toString().padStart(2, '0'),
      hours: dur.hours().toString().padStart(2, '0'),
      minutes: dur.minutes().toString().padStart(2, '0'),
      seconds: dur.seconds().toString().padStart(2, '0'),
    };
  }, [earlyBirdEnd]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className={styles.RegisterNowMain}>
      <Title
        title="./      REGISTER NOW"
        description="Secure your spot at the Next-Gen AI Summit 2052 and join the future of AI innovation."
      />

      <div className={styles.RegisterNowMainContent}>
        <div className={styles.countdownBox}>
          <p className={styles.timerLabel}>Early Bird Pricing Ends In:</p>

          <div className={styles.timer}>
            <span className={styles.time}>{timeLeft.days}</span>
            <span className={styles.separator}>:</span>

            <span className={styles.time}>{timeLeft.hours}</span>
            <span className={styles.separator}>:</span>
            <span className={styles.time}>{timeLeft.minutes}</span>
          </div>
          <div className={styles.timerLabels}>
            <span className={styles.span}>DAYS</span>

            <span className={styles.span}>HOURS</span>
            <span className={styles.span}>MINUTES</span>
          </div>
        </div>
        <img src={pattern} alt="Pattern" className={styles.Pattern} />
      </div>
    </section>
  );
}
