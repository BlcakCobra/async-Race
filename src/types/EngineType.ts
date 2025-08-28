import { Car } from "./GetCareType";

export interface EngineData {
  velocity?: number;
  distance?: number;
  start?: number;
  end?: number;
  time?: number;
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
