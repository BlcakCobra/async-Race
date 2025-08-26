export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface initialStateType {
    cars: Car[];
    loading: boolean;
    error: string | null;
}