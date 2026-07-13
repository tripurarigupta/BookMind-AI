import api from "./axios";

const SearchApi = {

    async searchBooks(title) {

        const response = await api.get(

            `/books/search?title=${encodeURIComponent(title)}`

        );

        return response.data;

    }

};

export default SearchApi;