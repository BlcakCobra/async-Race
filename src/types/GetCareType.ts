export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarState {
    cars: Car[];
    loading: boolean;
    error: string | null;
}