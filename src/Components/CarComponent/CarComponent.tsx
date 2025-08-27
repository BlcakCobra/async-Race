import { AsyncGetCarSlice, setCurrentPage } from './../../store/Slices/GetCarSlice';
import { useAppDispatch, useAppSelector } from './../../store/store';
import { Car } from './../../types/GetCareType';
import { useEffect, useState } from 'react';
import styles from "./CarComponent.module.scss";
import CarModel from './CarModel/CarModel';
import { AsyncCreateCarSlice, ResetAreas, setError } from './../../store/Slices/CreateCarSlice';
import { AsyncDeleteCarSlice } from './../../store/Slices/DeleteCarSlice';
import Pagination from './Pagination/Pagination';
import CreateCar from './CreateCar/CreateCar';

const CarComponent = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error, currentPage } = useAppSelector((state) => state.GetCarSlice);
  const itemsPerPage = 7;
  const [crMenu, setCrMenu] = useState(false);

  useEffect(() => {
    dispatch(AsyncGetCarSlice());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const toggleCreateMenu = () => setCrMenu(prev => !prev);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, color } = useAppSelector((state) => state.CreateCarSlice.car);

    if (!name || name.length < 3) {
      dispatch(setError("Name must be at least 3 characters long"));
      return;
    }
    if (!color) {
      dispatch(setError("Color can't be empty"));
      return;
    }

    dispatch(AsyncCreateCarSlice({ name, color }));
    dispatch(ResetAreas());
  };

  const handleDelete = (id: number) => {
    dispatch(AsyncDeleteCarSlice(id))
      .unwrap()
      .then(() => dispatch(AsyncGetCarSlice()))
      .catch((err) => console.error(err));
  };

  const handlePageChange = (page: number) => dispatch(setCurrentPage(page));

  const totalPages = cars.length ? Math.ceil(cars.length / itemsPerPage) : 1;
  const paginatedCars = cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={styles.carContainer}>
      <div className={styles.Menu}>
        <h2 className={styles.title}>🚘 Cars in the Garage:</h2>
        <button onClick={toggleCreateMenu} className={styles.createMenu}>Create Car</button>
      </div>

      {crMenu && <CreateCar handleSubmit={handleSubmit} />}

      <div className={styles.cardGrid}>
        {paginatedCars.map((car: Car) => (
          <div key={car.id} className={styles.carCardBox}>
            <button onClick={() => handleDelete(car.id)} className={styles.DeleteBut}>Delete</button>
            <div className={styles.carCard}>
              <CarModel car={car} />
              <h3 className={styles.name}>{car.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default CarComponent;
