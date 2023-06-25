package com.bookstore.books.payloads;




public class ReviewDto {
	
	private int review_id;
	
	private int book_id;
	private int user_id;
	
	private int rating;
	private String content;
	private String username;
	public ReviewDto(int review_id, int user_id,  int rating,
			String description, int book_id, String username) {
		super();
		this.review_id = review_id;
		this.book_id = book_id;
		this.user_id = user_id;
		this.rating = rating;
		this.content = description;
		this.username = username;
	}
	public ReviewDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public void setBook_id(int book_id) {
		this.book_id = book_id;
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
