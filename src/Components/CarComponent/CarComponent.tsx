import React, { JSX, useEffect, useState } from 'react';

import {
  AsyncCreateCarSlice,
  ResetAreas,
  setError,
} from './../../store/Slices/CreateCarSlice';
import { AsyncCreateWinner } from './../../store/Slices/CreateWinnerSlice';
import { AsyncDeleteCarSlice } from './../../store/Slices/DeleteCarSlice';
import {
  AsyncEngineControl,
  resetEngineData,
} from './../../store/Slices/EngineControlSlice';
import {
  AsyncGetCarSlice,
  setCurrentPage,
} from './../../store/Slices/GetCarSlice';
import { AsyncGetWinners } from './../../store/Slices/GetWinnersSlice';
import { AsyncUpdateCarSlice } from './../../store/Slices/UpdateCarSlice';
import { AsyncUpdateWinner } from './../../store/Slices/UpdateWinnerSlice';
import { store, useAppDispatch, useAppSelector } from './../../store/store';
import { Car } from './../../types/GetCareType';
import styles from './CarComponent.module.scss';
import CarModel from './CarModel/CarModel';
import CreateCar from './CreateCar/CreateCar';
import Pagination from './Pagination/Pagination';

const CarComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { cars, loading, error, currentPage } = useAppSelector(
    (state) => state.GetCarSlice,
  );
  const { name, color } = useAppSelector((state) => state.CreateCarSlice.car);
  const { engineData } = useAppSelector((state) => state.EngineSlice);
  const itemsPerPage = 7;
  const [crMenu, setCrMenu] = useState<boolean>(false);

  useEffect((): void => {
    dispatch(AsyncGetCarSlice());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const toggleCreateMenu = (): void => setCrMenu((prev) => !prev);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!name || name.length < 3) {
      dispatch(setError('Name must be at least 3 characters long'));
      return;
    }
    if (!color) {
      dispatch(setError("Color can't be empty"));
      return;
    }
    dispatch(AsyncCreateCarSlice({ name, color }))
      .unwrap()
      .then(() => dispatch(AsyncGetCarSlice()))
      .catch((err: unknown) => console.error(err));
    dispatch(ResetAreas());
  };

  const handleDelete = (id: number): void => {
    dispatch(AsyncDeleteCarSlice(id))
      .unwrap()
      .then(() => dispatch(AsyncGetCarSlice()))
      .catch((err: unknown) => console.error(err));
  };

  const handlePageChange = (page: number): void => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = cars.length ? Math.ceil(cars.length / itemsPerPage) : 1;
  const paginatedCars = cars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdate = (car: Car): void => {
    const newName = prompt('Enter new name:', car.name);
    const newColor = prompt('Enter new color:', car.color);
    if (!newName || !newColor) return;
    dispatch(
      AsyncUpdateCarSlice({ id: car.id, name: newName, color: newColor }),
    )
      .unwrap()
      .then(() => dispatch(AsyncGetCarSlice()))
      .catch((err: unknown) => console.error(err));
  };

  const startEngine = (id: number): void => {
    dispatch(AsyncEngineControl({ id, status: 'started' }));
  };

  const stopEngine = (id: number): void => {
    dispatch(AsyncEngineControl({ id, status: 'stopped' }));
  };

  function waitForAllCarsToFinish(
    carIds: number[],
    getEngineData: () => Record<number, { time?: number }>,
  ): Promise<void> {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const data = getEngineData();
        const allFinished = carIds.every((id) => data[id]?.time !== undefined);
        if (allFinished) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 200);
    });
  }

  const startAllRaces = (): void => {
    if (!paginatedCars.length) return;

    const carIds = paginatedCars.map((car) => car.id);
    const promises = carIds.map((id) =>
      dispatch(AsyncEngineControl({ id, status: 'started' })).unwrap(),
    );

    Promise.all(promises)
      .then(async (): Promise<void> => {
        await waitForAllCarsToFinish(
          carIds,
          () => store.getState().EngineSlice.engineData,
        );

        const latestEngineData = store.getState().EngineSlice.engineData;
        const results = carIds.map((id) => ({
          id,
          time: latestEngineData[id]?.time ?? Infinity,
        }));

        const winner = results.reduce(
          (best, current) =>
            !best || current.time < best.time ? current : best,
          null as (typeof results)[0] | null,
        );

        if (winner) {
          alert(
            `🏆 Winner - Car ${winner.id}, Time ${(winner.time / 1000).toFixed(
              2,
            )}s`,
          );
          const existingWinner = store
            .getState()
            .GetWinnersSlice.winners.find((w) => w.id === winner.id);

          if (existingWinner) {
            const newWins = existingWinner.wins + 1;
            const bestTime = Math.min(existingWinner.time, winner.time);
            dispatch(
              AsyncUpdateWinner({
                id: winner.id,
                wins: newWins,
                time: bestTime,
              }),
            )
              .unwrap()
              .then(() => {
                dispatch(
                  AsyncGetWinners({
                    page: 1,
                    limit: 20,
                    sort: 'wins',
                    order: 'DESC',
                  }),
                );
              });
          } else {
            dispatch(
              AsyncCreateWinner({ id: winner.id, wins: 1, time: winner.time }),
            )
              .unwrap()
              .then(() => {
                dispatch(
                  AsyncGetWinners({
                    page: 1,
                    limit: 20,
                    sort: 'wins',
                    order: 'DESC',
                  }),
                );
              });
          }
        }
      })
      .catch((err: unknown): void => {
        console.error('Error:', err);
      });
  };

  return (
    <div className={styles.carContainer}>
      <div className={styles.Menu}>
        <h2 className={styles.title}>🚘 Cars in the Garage:</h2>
        <button onClick={toggleCreateMenu} className={styles.createMenu}>
          Create Car
        </button>
        <button
          onClick={() => dispatch(resetEngineData())}
          className={styles.createMenu}
        >
          Reset Races
        </button>
        <button onClick={() => startAllRaces()} className={styles.createMenu}>
          Start Race
        </button>
      </div>

      {crMenu && <CreateCar handleSubmit={handleSubmit} />}

      <div className={styles.cardGrid}>
        {paginatedCars.length ? (
          paginatedCars.map((car: Car) => {
            const velocity = engineData[car.id]?.velocity || 0;
            const distance = engineData[car.id]?.distance || 0;
            return (
              <div key={car.id} className={styles.carCardBox}>
                <div className={styles.Buttons}>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className={styles.DeleteBut}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(car)}
                    className={styles.ModifyBut}
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => startEngine(car.id)}
                    disabled={velocity > 0}
                    className={styles.EngineBut}
                  >
                    Start
                  </button>
                  <button
                    onClick={() => stopEngine(car.id)}
                    disabled={velocity === 0}
                    className={styles.EngineBut}
                  >
                    Stop
                  </button>
                </div>

                <div className={styles.carCard}>
                  <CarModel car={car} velocity={velocity} distance={distance} />
                  <div className={styles.carInfo}>
                    <h3 className={styles.name}>{car.name}</h3>
                    <p className={styles.Velocity}>Velocity: {velocity} km/h</p>
                    {engineData[car.id]?.time !== undefined && (
                      <p className={styles.Time}>
                        Time:{' '}
                        {((engineData[car.id]?.time ?? 0) / 1000).toFixed(2)} s
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Cars</h1>
        )}
      </div>

      <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default CarComponent;
