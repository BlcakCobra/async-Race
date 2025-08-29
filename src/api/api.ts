import axios, { AxiosResponse } from 'axios';

import { Car } from '../types/GetCareType';

const baseUrl = axios.create({
  baseURL: 'http://localhost:3002/',
});

interface Winner {
  id: number;
  wins: number;
  time: number;
}

export const ReqToServer = {
  async getCarsReq(): Promise<Car[]> {
    try {
      const res: AxiosResponse<Car[]> = await baseUrl.get('/garage');
      return res.data;
    } catch (error: unknown) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  },

  async createCarReq(name: string, color: string): Promise<Car> {
    if (!name || name.length < 3)
      throw new Error('Name must be at least 3 characters long');
    if (!color) throw new Error("Color can't be empty");

    try {
      const response: AxiosResponse<Car> = await baseUrl.post('/garage', {
        name,
        color,
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Error creating car:', error);
      throw error;
    }
  },

  async deleteCarReq(id: number): Promise<void> {
    if (!id) throw new Error('id is required!');
    try {
      await baseUrl.delete(`/garage/${id}`);
    } catch (error: unknown) {
      console.error('Error deleting car:', error);
      throw error;
    }
  },

  async updateCarReq(name: string, color: string, id: number): Promise<Car> {
    if (!name || name.length < 3)
      throw new Error('Name must be at least 3 characters long');
    if (!color) throw new Error("Color can't be empty");
    if (!id) throw new Error('id is required!');

    try {
      const response: AxiosResponse<Car> = await baseUrl.put(`/garage/${id}`, {
        name,
        color,
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Error updating car:', error);
      throw error;
    }
  },

  async engineControlReq(
    id: number,
    status: 'started' | 'stopped' | 'drive',
  ): Promise<{ velocity: number; distance: number; time?: number }> {
    if (!id || id <= 0) throw new Error('Invalid id');
    if (!['started', 'stopped', 'drive'].includes(status))
      throw new Error('Invalid status');

    try {
      const response = await baseUrl.patch(`/engine`, null, {
        params: { id, status },
      });
      return response.data;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  },

  async createWinner(id: number, wins: number, time: number): Promise<Winner> {
    if (!id) throw new Error('id is required!');
    if (wins == null || time == null)
      throw new Error("time and wins can't be empty");

    try {
      const existingWinner = await this.getWinner(id).catch(() => null);

      if (existingWinner) {
        return this.updateWinner(
          id,
          existingWinner.wins + wins,
          Math.min(existingWinner.time, time),
        );
      } else {
        const response: AxiosResponse<Winner> = await baseUrl.post('/winners', {
          id,
          wins,
          time,
        });
        return response.data;
      }
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  },

  async getWinners(
    page = 1,
    limit = 10,
    sort: 'id' | 'wins' | 'time' = 'wins',
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ data: Winner[]; totalCount: number }> {
    try {
      const response: AxiosResponse<Winner[]> = await baseUrl.get('/winners', {
        params: { _page: page, _limit: limit, _sort: sort, _order: order },
      });
      return {
        data: response.data,
        totalCount: Number(response.headers['x-total-count'] || 0),
      };
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  },

  async getWinner(id: number): Promise<Winner> {
    if (!id) throw new Error('id is required!');
    try {
      const response: AxiosResponse<Winner> = await baseUrl.get(
        `/winners/${id}`,
      );
      return response.data;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  },

  async deleteWinner(id: number): Promise<void> {
    if (!id) throw new Error('id is required!');
    try {
      await baseUrl.delete(`/winners/${id}`);
    } catch (error: unknown) {
      console.error('Error deleting winner:', error);
      throw error;
    }
  },

  async updateWinner(id: number, wins: number, time: number): Promise<Winner> {
    if (!id) throw new Error('id is required!');
    try {
      const response: AxiosResponse<Winner> = await baseUrl.put(
        `/winners/${id}`,
        { wins, time },
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Error updating winner:', error);
      throw error;
    }
  },
};
