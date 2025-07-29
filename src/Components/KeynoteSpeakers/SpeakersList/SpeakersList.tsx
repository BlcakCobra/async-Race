import Speaker1 from '../../../assets/Speakers1.jpg';
import Speaker2 from '../../../assets/Speakers2.jpg';
import Speaker3 from '../../../assets/Speakers3.jpg';
import Speaker4 from '../../../assets/Speakers4.jpg';

import styles from './SpeakersList.module.scss';

const speakersList = [
  {
    type: 'text',
    name: 'Dr. Emily Carter',
    description: 'Chief AI Scientist, OpenAI',
  },
  {
    type: 'img',
    img: Speaker1,
  },
  {
    type: 'text',
    name: 'Elon Park',
    description: 'CTO, DeepMind',
  },
  {
    type: 'img',
    img: Speaker2,
  },

  {
    type: 'img',
    img: Speaker3,
  },
  {
    type: 'text',
    name: 'Laura Kim',
    description: 'AI Policy Advisor, EU Commission',
  },
  {
    type: 'img',
    img: Speaker4,
  },
  {
    type: 'text',
    name: 'Dr. Alan Foster',
    description: 'Stanford AI Lab',
  },
];

const SpeakersList = () => (
  <div className={styles.speakersWrapper}>
    <div className={styles.speakersRow}>
      {speakersList.map((speaker, index) => (
        <div
          key={index}
          className={`${styles.speakerCard} ${
            speaker.type === 'text' ? styles.textCard : styles.imageCard
          }`}
        >
          {speaker.type === 'text' ? (
            <>
              <h3 className={styles.name}>{speaker.name}</h3>
              <p className={styles.description}>{speaker.description}</p>
            </>
          ) : (
            <img
              src={speaker.img}
              alt={speaker.name ? `Photo of ${speaker.name}` : `Speaker ${speaker}`}
              className={styles.image}
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);
export default SpeakersList;
