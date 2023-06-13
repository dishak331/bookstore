package com.bookstore.reviews.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.reviews.dao.ReviewDao;
import com.bookstore.reviews.entities.Reviews;
import com.bookstore.reviews.services.ReviewService;

import jakarta.validation.Valid;

//import jakarta.validation.Valid;

@RestController
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	@GetMapping("/reviews/books/{book_id}/users/{user_id}")
	public List<Reviews> getReviews(@PathVariable String book_id, @PathVariable String user_id){
		return this.reviewService.getReviews(Integer.parseInt(user_id),Integer.parseInt(book_id));
	}
	
	@GetMapping("/reviews/books/{book_id}")
	public List<Reviews> getReviewsByBookId(@PathVariable int book_id) {
		return this.reviewService.getReviewsByBookId(book_id);
	}
	
	@PostMapping("/reviews")
	public Reviews updateReview(@Valid @RequestBody Reviews review) {
		return this.reviewService.postReview(review);
	}
}
