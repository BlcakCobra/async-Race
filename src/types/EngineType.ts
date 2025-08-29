import { Car } from './GetCareType';

export interface EngineData {
  velocity?: number | null;
  distance?: number | null;
  start?: number | null;
  end?: number | null;
  time?: number | null;
  position: number | null;
}

export interface EngineState {
  loading: boolean;
  error: string | null;
  engineData: Record<number, EngineData>;
}

export type CarModelType = {
  car: Car;
  velocity?: number;
  distance?: number;
};
