import Title from "../Title/Title"
import styles from "./Agenda.module.scss"
import Schedule from "./Schedule/Schedule"

const Agenda = () => (
  
  <section className={styles.AgendaMain}>
    <Title title="AGENDA" description="October 15-17, 2052 | Horizon Convention Center, Amsterdam" />
    <Schedule />
  </section>
)
export default Agenda