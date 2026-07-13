import api from "./axios";

const ShelfApi = {
    async addToShelf(bookId, status) {
        const response = await api.post(`/shelf/${bookId}`, {
            status: status,
        });
        return response.data;
    },
    async getBookShelf(bookId) {
        const response = await api.get(`/shelf/${bookId}`
        );
        return response.data;
    },
    async getShelf(status, page = 1, limit = 20) {
        const response = await api.get(
            `/shelf/status/${status}?page=${page}&limit=${limit}`
        );
        return response.data;
    }
};

export default ShelfApi;