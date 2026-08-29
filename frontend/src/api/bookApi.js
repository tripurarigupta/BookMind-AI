import api from "./axios";

const BookApi = {
  async getBook(bookId) {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  },

  async getBooks({ page = 1, limit = 10, sort_by, sort_order, author, publisher,
                   year_from, year_to, min_rating, max_rating, min_pages, max_pages } = {}) {
    const params = { page, limit };
    if (sort_by) params.sort_by = sort_by;
    if (sort_order) params.sort_order = sort_order;
    if (author) params.author = author;
    if (publisher) params.publisher = publisher;
    if (year_from != null) params.year_from = year_from;
    if (year_to != null) params.year_to = year_to;
    if (min_rating != null) params.min_rating = min_rating;
    if (max_rating != null) params.max_rating = max_rating;
    if (min_pages != null) params.min_pages = min_pages;
    if (max_pages != null) params.max_pages = max_pages;
    const response = await api.get("/books/", { params });
    return response.data;
  },
};

export default BookApi;
