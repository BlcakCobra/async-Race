import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import CarComponent from './Components/CarComponent/CarComponent';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Garage" element={<CarComponent/>} />
      </Routes>
    </>
  );
};

export default App;
