import React, { JSX, useEffect } from 'react';

import { Winner } from '@/types/WinnerType';

import { AsyncDeleteWinner } from '../../store/Slices/DeleteWinnerSlice';
import { AsyncGetCarSlice } from '../../store/Slices/GetCarSlice';
import SvgCar from '../CarComponent/CarModel/SvgCar/SvgCar';
import Pagination from '../CarComponent/Pagination/Pagination';

import {
  AsyncGetWinners,
  setCurrentPage,
} from './../../store/Slices/GetWinnersSlice';
import { useAppDispatch, useAppSelector } from './../../store/store';
import styles from './Winners.module.scss';

export default function Winners(): JSX.Element {
  const dispatch = useAppDispatch();
  const { winners, loading, error, currentPage } = useAppSelector(
    (state) => state.GetWinnersSlice,
  );
  const { cars } = useAppSelector((state) => state.GetCarSlice);

  const sortedWinners = [...winners].sort((a, b) => a.time - b.time);

  const itemsPerPage = 7;

  const handlePageChange = (page: number): void => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = sortedWinners.length
    ? Math.ceil(sortedWinners.length / itemsPerPage)
    : 1;

  const paginatedWinners = sortedWinners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    dispatch(AsyncGetCarSlice());
    dispatch(
      AsyncGetWinners({ page: 1, limit: 20, sort: 'wins', order: 'DESC' }),
    );
  }, [dispatch]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const handleDeleteWinner = (id: number): void => {
    dispatch(AsyncDeleteWinner(id))
      .unwrap()
      .then(() => {
        dispatch(AsyncGetCarSlice());
        dispatch(
          AsyncGetWinners({ page: 1, limit: 20, sort: 'wins', order: 'DESC' }),
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.winnerContainer}>
      <h2 className={styles.title}>🏆 Winners:</h2>
      <div className={styles.winnersTable}>
        <div className={styles.header}>
          <span>№</span>
          <span>CAR ID</span>
          <span>Car</span>
          <span>Wins</span>
          <span>Name</span>
          <span>Time (s)</span>
        </div>
        <div className={styles.rows}>
          {paginatedWinners.map((winner: Winner, index: number) => {
            const car = cars.find((c) => c.id === winner.id);
            return (
              <div key={winner.id} className={styles.row}>
                <span>{(currentPage - 1) * itemsPerPage + index + 1}</span>
                <span>{winner.id}</span>
                <SvgCar color={car?.color || '#fff'} />
                <span>{winner.wins}</span>
                <span>{car?.name || 'Unknown'}</span>
                <span>{(winner.time / 1000).toFixed(2)}</span>
                <button onClick={() => handleDeleteWinner(winner.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
