import styles from "./App.module.scss"
import Header from "./Components/Header/Header"
import FirstBlock from "./Components/FirstBlock/FirstBlock"
import Collaboration from "./Components/Collaboration/Collaboration"
import Advantages from "./Components/Advantages/Advantages"
import Agenda from "./Components/Agenda/Agenda"
// import KeynoteSpeakers from "./Components/KeynoteSpeakers/KeynoteSpeakers"
// import WhyAttend from "./Components/WhyAttend/WhyAttend"
// import PastAttendees from "./Components/PastAttendees/PastAttendees"
// import RegisterNow from "./Components/RegisterNow/RegisterNow"
// import TicketOptions from "./Components/TicketOptions/TicketOptions"
// import Connect from "./Components/Connect/Connect"
// import Footer from "./Components/Footer/Footer"

const Home = () => (

  <div className={styles.wrapper}>
    <Header />
    <FirstBlock />
    <Collaboration />
    <Advantages />
    <Agenda />
    {/* <KeynoteSpeakers /> */}
    {/* <WhyAttend /> */}
    {/* <PastAttendees /> */}
    {/* <RegisterNow /> */}
    {/* <TicketOptions /> */}
    {/* <Connect /> */}
    {/* <Footer /> */}
  </div>
)

export default Home 