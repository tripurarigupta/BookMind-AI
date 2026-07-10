import api from "./axios";

export const getPopularBooks = async () => {
    const response = await api.get("/recommendations/");
    return response.data;
};