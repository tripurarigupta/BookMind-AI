import pickle

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


class ContentBasedRecommendationAlgorithm:
    with open("app/ml/tfidf_matrix.pkl", "rb") as f:
        tfidf_matrix = pickle.load(f)

    with open("app/ml/book_ids.pkl", "rb") as f:
        book_ids = pickle.load(f)
        
    book_index = {
        book_id: index
        for index, book_id in enumerate(book_ids)
    }

    @staticmethod
    def recommend(book_id: int, top_n: int = 20) -> list[int]:
        """
            Returns the IDs of the top N books most similar
            to the given book using TF-IDF cosine similarity.
        """

        row_index = ContentBasedRecommendationAlgorithm.book_index.get(book_id)

        if row_index is None:
            return []

        similarity_scores = cosine_similarity(
            ContentBasedRecommendationAlgorithm.tfidf_matrix[row_index],
            ContentBasedRecommendationAlgorithm.tfidf_matrix,
        ).flatten()

        similar_indices = np.argsort(similarity_scores)[::-1]

        # Remove the same book
        similar_indices = similar_indices[similar_indices != row_index]

        # Keep only top_n books
        similar_indices = similar_indices[:top_n]

        recommended_book_ids = [
            ContentBasedRecommendationAlgorithm.book_ids[index]
            for index in similar_indices
        ]

        return recommended_book_ids