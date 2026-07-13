import api from "./axios";
const BookApi = {
    async getBook(bookId) {
        const response = await api.get(`/books/${bookId}`);
        return response.data;
    }
};

export default BookApi;