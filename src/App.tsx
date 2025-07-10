import styles from "./App.module.scss"
import Header from "./Components/Header/Header"
import FirstBlock from "./Components/FirstBlock/FirstBlock"

const Home = () => (
  
  <div className={styles.wrapper}>
    <Header />
    <FirstBlock />
  </div>
)

export default Home 