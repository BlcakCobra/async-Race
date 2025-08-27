import React from 'react';
import styles from "./CreateCar.module.scss";
import { setCarName, setCarColor } from '../../../store/Slices/CreateCarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';

type CreateCarProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const CreateCar: React.FC<CreateCarProps> = ({ handleSubmit }) => {
  const dispatch = useAppDispatch();
  const { name, color } = useAppSelector((state) => state.CreateCarSlice.car);

  return (
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
          placeholder="Enter car color"
          onChange={(e) => dispatch(setCarColor(e.target.value))}
        />
      </div>
      <button className={styles.createMenu} type='submit'>Create New Car</button>
    </form>
  );
};

export default CreateCar;
