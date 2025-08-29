export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface CreateWinnerState {
  winner: Winner | null;
  loading: boolean;
  error: string | null;
  wins: number;
}

export interface GetWinnersState {
  winners: Winner[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
}
