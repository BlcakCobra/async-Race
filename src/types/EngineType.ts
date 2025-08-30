import { Car } from './GetCareType';

export interface EngineData {
  velocity: number;
  distance: number;
  start: number | null;
  end: number | null;
  time?: number;
  position: number;
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
  onFinish?: () => void;
};
