import api from "./axios";

const SearchApi = {
  async searchBooks(query, page = 1, limit = 10) {
    const response = await api.get("/books/search", {
      params: { q: query, page, limit },
    });
    return response.data;
  },
};

export default SearchApi;
