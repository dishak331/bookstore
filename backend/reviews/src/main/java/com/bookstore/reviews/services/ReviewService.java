package com.bookstore.reviews.services;

import java.util.List;

import com.bookstore.reviews.entities.Reviews;

//import com.example.bookstore.entities.Reviews;

public interface ReviewService {
	public List<Reviews> getReviews(int user_id, int book_id);
	public Reviews postReview(Reviews review);
	public List<Reviews> getReviewsByBookId(int book_id);
}
