package com.bookstore.reviews.entities;


//import com.example.bookstore.entities.Books;
//import com.example.bookstore.entities.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;

@Entity
public class Reviews {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int review_id;
	
	
	@NotNull(message="book_id cannot be null")
	private int book_id;
	
	@NotNull(message="user_id cannot be null")
	private int user_id;
	@NotNull(message="Rating cannot be null")
	private int rating;
	private String content;
	public Reviews(int review_id, int user_id, @NotNull(message = "Rating cannot be null") int rating,
			String description, int book_id) {
		super();
		this.review_id = review_id;
		this.book_id = book_id;
		this.user_id = user_id;
		this.rating = rating;
		this.content = description;
	}
	public Reviews() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getReview_id() {
		return review_id;
	}
	public void setReview_id(int review_id) {
		this.review_id = review_id;
	}
	public int getBook_id() {
		return book_id;
	}
	public void setBook_id(int book) {
		this.book_id = book;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user) {
		this.user_id = user;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getDescription() {
		return content;
	}
	public void setDescription(String description) {
		this.content = description;
	}
	
	
	
	
}

