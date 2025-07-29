import styles from './App.module.scss';
import Advantages from './Components/Advantages/Advantages';
import Agenda from './Components/Agenda/Agenda';
import Collaboration from './Components/Collaboration/Collaboration';
import Connect from './Components/Connect/Connect';
import FirstBlock from './Components/FirstBlock/FirstBlock';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import KeynoteSpeakers from './Components/KeynoteSpeakers/KeynoteSpeakers';
import PastAttendees from './Components/PastAttendees/PastAttendees';
import RegisterNow from './Components/RegisterNow/RegisterNow';
import TicketOptions from './Components/TicketOptions/TicketOptions';
import WhyAttend from './Components/WhyAttend/WhyAttend';

const Home = () => (
  <div className={styles.wrapper}>
    <Header />
    <FirstBlock />
    <Collaboration />
    <Advantages />
    <Agenda />
    <KeynoteSpeakers />
    <WhyAttend />
    <PastAttendees />
    <RegisterNow />
    <TicketOptions />
    <Connect />
    <Footer />
  </div>
);

export default Home;
