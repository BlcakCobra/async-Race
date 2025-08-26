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
            console.log(response);
            
            return response.data;
        } catch (error) {
            console.error("Error creating car:", error);
            throw error;
        }
    }
};
