package com.bookstore.users.payloads;


import com.bookstore.users.entitites.Users;

public class ReviewDto {
private int review_id;
	
	//private Books book;
	private Users user;
	
	private int rating;
	private String content;
	public ReviewDto(int review_id, Users user,  int rating,
			String description) {
		super();
		this.review_id = review_id;
//		this.book = book;
		this.user = user;
		this.rating = rating;
		this.content = description;
	}
	public ReviewDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getReview_id() {
		return review_id;
	}
	public void setReview_id(int review_id) {
		this.review_id = review_id;
	}
//	public Books getBook() {
//		return book;
//	}
//	public void setBook(Books book) {
//		this.book = book;
//	}
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
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
