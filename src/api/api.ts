import axios from "axios";

const baseUrl = axios.create({
    baseURL: "http://localhost:3002/"
});

export const ReqToServer = {
    async getCarsReq() {
        try {
            const res = await baseUrl.get("/garage");
            return res.data;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error;
        }
    },

    async createCarReq(name: string, color: string) {
        if (!name || name.length < 3) {
            throw new Error("Name must be at least 3 characters long");
        }
        if (!color) {
            throw new Error("Color can't be empty");
        }
        try {
            const response = await baseUrl.post("/garage", {
                name,
                color
            });

            return response.data;
        } catch (error) {
            console.error("Error creating car:", error);
            throw error;
        }
    },

    async deleteCarReq(id: number) {
        if (!id) {
            throw new Error("id is required!");
        }

        try {
            const response = await baseUrl.delete(`/garage/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting car:", error);
            throw error;
        }
    },

    async updateCarReq(name: string, color: string, id: number) {
        if (!name || name.length < 3) {
            throw new Error("Name must be at least 3 characters long");
        }
        if (!color) {
            throw new Error("Color can't be empty");
        }
        if (!id) {
            throw new Error("id is required!");
        }
        try {
            const response = await baseUrl.put(`/garage/${id}`, {
                name, color
            })
            return response.data
        } catch (error) {
            console.error("Error deleting car:", error);
            throw error;
        }
    },

async engineControlReq(id: number, status: 'started' | 'stopped' | 'drive') {
        if (!id || id <= 0) throw new Error('Invalid id');
        if (!['started', 'stopped', 'drive'].includes(status)) throw new Error('Invalid status');

        try {
            const response = await baseUrl.patch(`/engine`, null, {
                params: { id, status },
            });
            return response.data; 
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            throw error;
        }
    }
}
