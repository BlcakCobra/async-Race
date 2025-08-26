import { AsyncGetCarSlice } from './../../store/Slices/GetCarSlice';
import { useAppDispatch, useAppSelector } from './../../store/store';
import { Car } from './../../types/GetCareType';
import { useEffect } from 'react';
import styles from "./CarComponent.module.scss";
import CarModel from './CarModel/CarModel';

const CarComponent = () => {
    const dispatch = useAppDispatch();
    const { cars, loading, error } = useAppSelector((state: any) => state.GetCarSlice);

    useEffect(() => {
        dispatch(AsyncGetCarSlice());
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.carContainer}>
            <h2 className={styles.title}>🚘 Cars in the Garage:</h2>
            <div className={styles.cardGrid}>
                {cars.map((car: Car) => (
                    <div key={car.id} className={styles.carCard}>
                        <div className={styles.carInfo}>
                            <h3>{car.name}</h3>
                            <p>Color: {car.color}</p>
                           <CarModel car={car}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarComponent;
