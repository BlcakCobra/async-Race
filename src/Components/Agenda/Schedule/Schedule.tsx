import Button from "../../Button/Button"
import styles from "./Schedule.module.scss"
import Pattern from "./../../../assets/ChatGPT Image 11 июл. 2025 г., 19_33_20.png"

const schedule = [
  {
    date: '2025-07-10',
    title: 'Day 1',
    theme: 'AI Innovations & Trends',
    timeStart: '09:00',
    timeEnd: '19:00',
    description:
      "The summit kicks off with a keynote, expert panels, and discussions on AI’s impact, ethics, and automation. Hands-on workshops and a networking event wrap up the day.",
  },
  {
    date: '2025-07-11',
    title: 'Day 2',
    theme: 'AI Technologies & Applications',
    timeStart: '09:00',
    timeEnd: '20:00',
    description:
      "Explore the latest in generative AI, robotics, and NLP, with industry-led discussions and tech demos. A startup showcase and investor insights highlight AI’s business potential.",
  },
  {
    date: '2025-07-12',
    title: 'Day 3',
    theme: 'Future of AI & Networking',
    timeStart: '09:30',
    timeEnd: '16:00',
    description:
      "Dive into AI’s long-term impact, attend expert-led workshops, and watch the startup pitch competition. The event closes with a visionary keynote and final networking sessions.",
  },
]

const Schedule = () => (

  <div className={styles.schedule}>
    <div className={styles.scheduleContainer}>
      {schedule.map((el) => (
        <div key={el.date} className={styles.dayCard}>
          <div className={styles.header}>
            <h2 className={styles.dayTitle}>{el.title}</h2>
            <p className={styles.time}>
              {el.timeStart} – {el.timeEnd}
            </p>
          </div>
          <div className={styles.description}>
            <h3 className={styles.theme}>{el.theme}</h3>
            <p className={styles.text}>{el.description}</p>
          </div>
        </div>
      ))}
      <Button width="598px" top="80px" left="auto" text="View detailed schedule" />
    </div>
    <img src={Pattern} alt="Pattern" className={styles.Pattern} />
  </div>
)

export default Schedule