import arrowRight from "../../assets/arrowRight.svg";
import arrowLeft from "../../assets/arrowLeft.svg";
import speakerElena1 from "../../assets/Speakers1.jpg";
import speakerElena2 from "../../assets/Speakers2.jpg";
import speakerElena3 from "../../assets/Speakers3.jpg";
import styles from "./PastAttendees.module.scss";
import { useState } from "react";

const attendeeFeedbacks = [
  {
    title: "THE BEST AI EVENT!",
    description: "Incredible speakers, top-tier networking, and cutting-edge discussions all in one place.",
    name: "Elena Rojas",
    role: "AI Researcher, DeepMind",
    image: speakerElena1,
    backgroundColor: "#1A1A1A",
  },
  {
    title: "THE BEST AI EVENT!",
    description: "Incredible speakers, top-tier networking, and cutting-edge discussions all in one place.",
    name: "Elena Rojas",
    role: "AI Researcher, DeepMind",
    image: speakerElena2,
    backgroundColor: "#0147FF",
  },
  {
    title: "UNMATCHED OPPORTUNITIES",
    description: "From hands-on workshops to visionary talks, this summit is a must-attend for AI professionals.",
    name: "David Laurent",
    role: "CEO, FutureAI Labs",
    image: speakerElena3,
    backgroundColor: "#DEDEE0",
  },
];

export default function PastAttendees() {
  const [currentCard, setCurrentCard] = useState(0);

  const changeCard = (direction: number) => {
    setCurrentCard((prev) => (prev + direction + attendeeFeedbacks.length) % attendeeFeedbacks.length);
  };

  return (

    <section className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>What Past Attendees Say</h1>
        <div className={styles.navigation}>
          <button className={styles.arrowBox} onClick={() => changeCard(-1)}>
            <img src={arrowLeft} alt="Previous" className={styles.arrowIcon} />
          </button>
          <button className={styles.arrowBox} onClick={() => changeCard(1)}>
            <img src={arrowRight} alt="Next" className={styles.arrowIcon} />
          </button>
        </div>
      </div>

      <div className={styles.feedbackSlider}>
        {attendeeFeedbacks.map((feedback, index) => {
          const isActive = index === currentCard;
          const isLeft = index === (currentCard + 2) % 3;

          return (
            <div
              key={index}
              className={`${styles.cardWrapper} ${isActive ? styles.active : isLeft ? styles.left : styles.right}`}
              onClick={() => setCurrentCard(index)}
              style={{ backgroundColor: feedback.backgroundColor }}
            >
              <div className={styles.feedbackContent}>
                <h2 className={styles.feedbackTitle}>{feedback.title}</h2>
                <p className={styles.feedbackText}>{feedback.description}</p>
                <div className={styles.speakerInfo}>
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    className={styles.speakerImage}
                  />
                  <div className={styles.speakerInfoText}>
                    <h4 className={styles.speakerName}>{feedback.name}</h4>
                    <h4 className={styles.speakerRole}>{feedback.role}</h4>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
