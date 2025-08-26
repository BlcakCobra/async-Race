import { AsyncGetCarSlice } from './../../store/Slices/GetCarSlice';
import { useAppDispatch, useAppSelector } from './../../store/store';
import { Car } from './../../types/GetCareType';
import { useEffect, useState } from 'react';
import styles from "./CarComponent.module.scss";
import CarModel from './CarModel/CarModel';
import { AsyncCreateCarSlice, setCarColor, setCarName, setError } from './../..//store/Slices/CreateCarSlice';

const CarComponent = () => {
    const dispatch = useAppDispatch();
    const { cars, loading, error } = useAppSelector((state) => state.GetCarSlice);
    const { name, color } = useAppSelector((state) => state.CreateCarSlice.car)

    const [crMenu, setCrMenu] = useState(false)
    
    useEffect(() => {
        dispatch(AsyncGetCarSlice());
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    let buttonSetter = () => {
        setCrMenu((prev) => !prev)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!name || name.length < 3) {
            setError("Name must be at least 3 characters long")
        }
        if (!color) {
            setError("Color can't be empty");
        }
        dispatch(AsyncCreateCarSlice({ name, color }))
    };
    return (
        <div className={styles.carContainer}>
            <div className={styles.Menu}>
                <h2 className={styles.title}>🚘 Cars in the Garage:</h2>
                <button onClick={buttonSetter} className={styles.createMenu}>Create Car</button>
            </div>
            {
                crMenu ? (
                    <form className={styles.carForm} onSubmit={handleSubmit}>
                        <div className={styles.carFormInputs}>
                            <input
                                className={styles.carInput}
                                type="text"
                                value={name}
                                placeholder="Enter car name"
                                onChange={(e) => dispatch(setCarName(e.target.value))}
                            />
                            <input
                                className={styles.carInput}
                                type="text"
                                value={color}
                                onChange={(e) => dispatch(setCarColor(e.target.value))}
                            />
                        </div>
                        <button className={styles.createMenu} type='submit'>
                            Create New Car
                        </button>
                    </form>
                ) : null
            }

            <div className={styles.cardGrid}>
                {cars.map((car: Car) => (
                    <div key={car.id} className={styles.carCard}>
                            <CarModel car={car} />
                            <h3 className={styles.name}>{car.name}</h3>
                            <h4>{car.id}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarComponent;
