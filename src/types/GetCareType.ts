import { ReactNode } from 'react';

export interface Car {
  wins: ReactNode;
  time: number;
  name: string;
  color: string;
  id: number;
}

export interface initialStateType {
  cars: Car[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  car: Car | null;
}
