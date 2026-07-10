import { useQuery } from "@tanstack/react-query";
import { getPopularBooks } from "../api/recommendationApi";

export const usePopularBooks = () => {
    return useQuery({
        queryKey: ["popular-books"],
        queryFn: getPopularBooks,
    });
};