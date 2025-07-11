import styles from "./App.module.scss"
import Header from "./Components/Header/Header"
import FirstBlock from "./Components/FirstBlock/FirstBlock"
import Collaboration from "./Components/Collaboration/Collaboration"
import Advantages from "./Components/Advantages/Advantages"
// import Agenda from "./Components/Agenda/Agenda"

const Home = () => (

  <div className={styles.wrapper}>
    <Header />
    <FirstBlock />
    <Collaboration />
    <Advantages />
    {/* <Agenda/> */}
  </div>
)

export default Home 