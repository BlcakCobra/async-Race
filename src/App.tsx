import { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';

import CarComponent from './Components/CarComponent/CarComponent';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Winners from './Components/Winners/Winners';

const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Garage" element={<CarComponent />} />
        <Route path="/Winners" element={<Winners />} />
      </Routes>
    </>
  );
};

export default App;
